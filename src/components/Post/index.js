import styled from 'styled-components'
import LinkBanner from '../LinkBanner'
import liked from "../../assets/images/redhearth.png"
import unLike from "../../assets/images/hearth.png"
import { useState } from 'react'
import axios from 'axios'
import ReactHashtag from '@mdnm/react-hashtag';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';
import { useContext, useState, useEffect, useRef } from 'react';
import { BsPencilFill } from 'react-icons/bs';

import LinkBanner from '../LinkBanner';
import DataContext from '../context/context.js';

export default function Post(props) {

    const [like, setLike] = useState(unLike)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    function action(postId){
        const promisse = axios.post('http://localhost:5000/likes', {postId}, config)
        .then(response =>{
            if(like === unLike){
                setLike(liked)
            } else {
                setLike(unLike)
            }
        })
        .catch(e=>{
            alert("ocorreu um erro ao curtir o post")
        })
    }

    return (
        <Banner>
            <ProfilePic src={props.userImage} />
            <Userinfo>
                <h1 className='name'>{props.userName}</h1>
                <p className='description'>{props.postDescription}</p>
            </Userinfo>
            <Like>
                <img onClick={()=> action(props.id)} className='like' src={like}/>
            </Like>
            <LinkBanner link={props.linkInfos} />
        </Banner>
    )
}

const Banner = styled.div` 
    width: 100vw;
    height: 232px;
    background-color: #171717;
    position: relative;
    border-radius: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 19px 23px 20px 69px;
    margin-bottom: 16px;
    

    @media (min-width: 376px){
        width: 611px;
        height: 276px;
        border-radius: 16px;
        padding: 19px 23px 20px 86px;
    }
`
const ProfilePic = styled.div` 
    width: 40px;
    height: 40px;
    border-radius: 26.5px;
    overflow: hidden;
    position: absolute;
    top: 17px;
    left: 18px;
`
  const navigate = useNavigate();

  const URL = `http://localhost:5000/posts/${props.id}`;

  const { data, setData } = useContext(DataContext);
  const username = data.name;
  const token = localStorage.getItem('token');

  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.postDescription);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);
  const editedTextRef = useRef(editedText);

  function redirectToUserProfile() {
    const { userId } = props;
    navigate(`/users/${userId}`);
  }

  const handleHashtagClick = (hashtagName) => {
    const hashtag = hashtagName.replace('#', '');
    navigate(`/hashtag/${hashtag}`, { state: { hashtag } });
  };

  const setTextRef = (data) => {
    editedTextRef.current = data;
    setEditedText(data);
  };

  const handler = (e) => {
    if (e.key === 'Escape') {
      setEditing(false);
      setEditedText('');
    }

    if (e.key === 'Enter') {
      disableAndSend();
    }
  };

  function disableAndSend() {
    setDisabled(true);

    if (editedTextRef.current === props.postDescription) {
      setEditing(false);
      setDisabled(false);
    } else {
      sendPost();
    }
  }

  function sendPost() {
    const bodyData = {
      username,
      description: editedTextRef.current,
    };

    const userData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.put(URL, bodyData, userData);

    promise.catch((err) => {
      alert('Houve um erro ao editar sua publicação.');
      setDisabled(false);
    });

    promise.then((response) => {
      setDisabled(false);
      setEditing(false);
    });
  }

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      const actual = inputRef.current;

      actual.addEventListener('keydown', handler);
      return () => actual.removeEventListener('keydown', handler);
    }
  }, [editing]);

  return (
    <Banner>
      <ProfilePic src={props.userImage} />
      <EditContainer>
        {props.userId === data.id ? (
          <BsPencilFill
            onClick={() => {
              setEditing(!editing);
              setTextRef(props.postDescription);
            }}
          />
        ) : (
          ''
        )}
      </EditContainer>
      <Userinfo>
        <h1 className="name" onClick={redirectToUserProfile}>
          {props.userName}
        </h1>
        {editing ? (
          <textarea
            style={disabled ? { opacity: '0.5' } : {}}
            disabled={disabled ? 'disabled' : ''}
            ref={inputRef}
            defaultValue={props.postDescription}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            onChange={(e) => setTextRef(e.target.value)}
          />
        ) : (
          <p className="description">
            <ReactHashtag onHashtagClick={handleHashtagClick}>
              {props.postDescription}
            </ReactHashtag>
          </p>
        )}
      </Userinfo>
      <LinkBanner link={props.linkInfos} />
    </Banner>
  );
}

const Banner = styled.div`
  width: 100vw;
  height: 232px;
  background-color: #171717;
  position: relative;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 19px 23px 20px 69px;
  margin-bottom: 16px;

  @media (min-width: 376px) {
    width: 611px;
    height: 276px;
    border-radius: 16px;
    padding: 19px 23px 20px 86px;
  }

  textarea {
    width: 100%;
    height: auto;
    margin-top: 10px;
    color: #4c4c4c;
    background: #ffffff;
    border-radius: 7px;
    padding: 9px;
  }
`;
const ProfilePic = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 26.5px;
  overflow: hidden;
  position: absolute;
  top: 17px;
  left: 18px;

  @media (min-width: 376px) {
    width: 50px;
    height: 50px;
  }

  background-image: url(${(props) => props.src});
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center;
`;
const Userinfo = styled.div`
  margin-bottom: 9px;
  .name {
    font-weight: 400;
    font-size: 17px;
    color: #fff;
  }

  .description {
    font-weight: 400;
    font-size: 15px;
    color: #b7b7b7;
    margin-top: 7px;

    span {
      font-weight: 700;
    }
  }

  @media (min-width: 376px) {
    .name {
      font-size: 19px;
    }
`
const Like = styled.div`
    img{
        position: absolute;
        left: 28px;
        top: 86px;
        width: 25px;
    }
    .description {
      font-size: 17px;
    }
  }
`

const EditContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
`;
