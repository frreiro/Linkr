import styled from 'styled-components'
import liked from "../../assets/images/redhearth.png"
import unLike from "../../assets/images/hearth.png"
import { useEffect, useState, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
import axiosInstance from '../../instances/axiosInstances';
import {RiRepeatFill} from "react-icons/ri";

import DataContext from '../context/context.js';

export default function Like({ postId, username, retweetCount }) {
    const [like, setLike] = useState()
    const [likesCount, setLikesCount] = useState(null);
    const [likedBy, setLikedBy] = useState([])
    const [confirming, setConfirming] = useState(false)
    const { data, setData } = useContext(DataContext)
    const userId = data.id
    const token = localStorage.getItem('token')
    const url = "/likes"
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    async function getlist() {
        let aux = false
        try {
            const promisse = await axiosInstance.get(`${url}/${postId}`, config)

            setLikesCount(promisse.data.length)
            if (promisse.data.length === 0) {
                setLike(unLike)
            }
            for (let i = 0; i < promisse.data.length; i++) {
                if (promisse.data[i] === username) {
                    promisse.data.splice(i, 1)
                    aux = true
                    setLike(liked)
                } else {
                    setLike(unLike)
                }
            }
            setLikedBy(filter(promisse.data, aux))
        } catch (error) {
            alert("ocorreu um erro")
        }
    }

    useEffect(() => {
        getlist()
    }, [likedBy])

    function filter(names, aux) {
        if (!aux && names.length === 0) return "ninguém curtiu esse post"
        else if (aux && names.length === 0) return `você curtiu`
        else if (aux && names.length === 1) return `você e ${names[0]} curtiram`
        else if (aux && names.length === 2) return `você, ${names[0]} e outros ${names.length - 1} curtiram`
        else if (names.length === 1) return `${names[0]} curtiu`
        else if (names.length === 2) return `${names[0]} e ${names[1]} curtiram`
        else if (names.length > 2) return `${names[0]} e ${names[1]} e outros ${names.length - 1} curtiram`
    }

    async function action(postId) {
        try {
            const promisse = await axiosInstance.post(url, { postId }, config)
            getlist()
            ReactTooltip.rebuild();
        } catch (error) {
            alert("ocorreu um erro ao curtir o post")
        }
    }

    async function repost() {
        try {
            const promise = await axiosInstance.post(`/share/${postId}`, {username: data.name}, config)
            getlist()
            setConfirming(false)
        } catch (e) {
            alert("ocorreu um erro ao compartilhar o post")
        }
    }

    return (
        <>
            {confirming ? 
            <Confirming>
                <ConfirmationContainer>
                    <div><p>Do you want to re-post this link?</p></div>
                    <div>
                        <button onClick={() => setConfirming(false)} style={{background: "white", color: "#1877F2"}}>No, cancel</button>
                        <button onClick={() => repost()} style={{background: "#1877F2", color: "white"}}>Yes, share!</button>
                    </div>
                </ConfirmationContainer>
            </Confirming>
            : ""}
            
            <Container>
                <img data-tip="" data-for={String(postId)} onClick={() => action(postId)} className='like' src={like} />
                <p>{likesCount ? `${likesCount} likes` : `0 likes`}</p>
                <ReactTooltip
                    type="light"
                    place="bottom"
                    id={String(postId)}
                    getContent={() => {
                        return null
                    }}
                >
                    {<span>{likedBy}</span>}
                </ReactTooltip>
                <br/>
                <RiRepeatFill style={{fontSize: "20px"}} onClick={() => setConfirming(true)}/>
                <p>{retweetCount} re-posts</p>
            </Container>
        </>
    )
}

const Confirming = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

const ConfirmationContainer = styled.div`
    width: 450px;
    height: 180px;
    background: #333333;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        font-weight: 700;
        font-size: 20px;
    }

    button {
        width: 120px;
        height: 37px;   
        border-radius: 5px;
        font-weight: 700;
    }

    div {
        margin-top: 10px;
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }
`

const Container = styled.div`
    position: absolute;
    left: 20px;
    top: 86px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img, p{
        width: 25px;
    }

    p{
        margin-top: 10px;
        top: 108px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        width: 100%;
    }
`