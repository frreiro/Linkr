import styled from 'styled-components';
import { useContext, useState, useEffect, useRef } from 'react';
import LinkBanner from '../LinkBanner';
import ReactHashtag from '@mdnm/react-hashtag';
import { useNavigate } from 'react-router';
import { BsPencilFill } from 'react-icons/bs';
import { RiRepeatFill } from "react-icons/ri";

import DataContext from '../context/context.js';
import Like from './Likes';
import axiosInstance from '../../instances/axiosInstances';
import Delete from './Delete';
import Comments from './Comments';
import CommentsBar from './CommentsBar';
import Retweet from './Retweet';

export default function Post(props) {
  const navigate = useNavigate();

  const { data, setData } = useContext(DataContext);
  const username = data.name;
  const token = localStorage.getItem('token');
  const [commentsCount, setCommentsCount] = useState()
  const [viewComments, setViewComments] = useState(false)
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.postDescription);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);
  const editedTextRef = useRef(editedText);

  function redirectToUserProfile() {
    const { userId, userName: username } = props;
    navigate(`/users/${userId}`, { state: { username } });
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
      }
    };

    const promise = axiosInstance.put(`/posts/${props.id}`, bodyData, userData);

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
    <PostContainer>
      {props.isRetweet ?
        <RetweetContainer>
          <RiRepeatFill style={{ fontSize: "18px", marginLeft: "15px" }} />
          <span>Re-posted by <strong style={{ fontWeight: "600" }}>{props.retweeterUsername === username ? "you" : props.retweeterUsername}</strong></span>
        </RetweetContainer>
        : ""}
      <Banner viewComments={viewComments}>

        <ProfilePic src={props.userImage} onClick={redirectToUserProfile} />
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
        <ActionBar>
          <Like postId={props.id} username={username} />
          <Comments setViewComments={setViewComments} commentsCount={commentsCount} viewComments={viewComments} />
          <Retweet postId={props.id} retweetCount={props.retweetCount} />
        </ActionBar>
        <CommentsBar postId={props.id} viewComments={viewComments} setCommentsCount={setCommentsCount} />
      </Banner>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  position: relative;
  margin-top: 45px;
  z-index: 0;
`

const Banner = styled.div`
  width: 100vw;
  background-color: #171717;
  position: relative;
  border-radius: 0px;
  z-index: 0;
  display: flex;
  word-wrap: break-word;
  flex-direction: column;
  justify-content: space-between;
  padding: 19px 23px 20px 69px;
  margin-bottom: 16px;

  @media (min-width: 376px) {
    width: 611px;
    border-radius: 16px;
    padding: 19px 23px ${props => props.viewComments ? "0px" : "20px"} 86px;
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

const RetweetContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 30px;
  background-color: #1E1E1E;
  display: flex;
  align-items: center;
  top: -30px;

  @media (min-width: 376px) {
    width: 611px;
    height: 20px;
    border-radius: 16px;
    padding-bottom: 80px;

    svg {
      position: absolute;
      top: 6px;
      left: 10px;
    }
    span {
      position: absolute;
      top: 8px;
      left: 45px;
      margin-left: 10px;
      font-size: 14px;
    }
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

  @media (min-width: 376px) {
    width: 50px;
    height: 50px;
  }

  background-image: url(${(props) => props.src});
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    cursor: pointer;
  }
`;

const Userinfo = styled.div`
  margin-bottom: 9px;
  .name {
    font-weight: 400;
    font-size: 17px;
    color: #fff;

    &:hover {
      cursor: pointer;
      filter: brightness(80%);
    }
  }

  .description {
    font-weight: 400;
    font-size: 15px;
    color: #b7b7b7;
    margin-top: 7px;

    span {
      font-weight: 700;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        filter: brightness(80%);
      }
    }
  }

  @media (min-width: 376px) {
    .name {
      font-size: 19px;
    }
  }
`;
const EditContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
`;

const ActionBar = styled.div` 
  position: absolute;
  left: 15px;
  top: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 376px) {
    left: 20px;
    top: 76px;
  }

`