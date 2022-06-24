import { useState, useContext } from "react";
import styled from "styled-components";
import { RiRepeatFill } from "react-icons/ri";

import axiosInstance from "../../instances/axiosInstances";
import DataContext from '../context/context.js';



export default function Retweet({ postId, retweetCount }) {

    const [confirming, setConfirming] = useState(false)

    const { data } = useContext(DataContext)


    const token = localStorage.getItem('token')
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    async function repost() {
        try {
            const promise = await axiosInstance.post(`/share/${postId}`, { username: data.name }, config)
            setConfirming(false)
        } catch (e) {
            alert("ocorreu um erro ao compartilhar o post")
        }
    }

    return (
        <Container>
            {confirming ?
                <Confirming>
                    <ConfirmationContainer>
                        <div><p>Do you want to re-post this link?</p></div>
                        <div>
                            <button onClick={() => setConfirming(false)} style={{ background: "white", color: "#1877F2" }}>No, cancel</button>
                            <button onClick={() => repost()} style={{ background: "#1877F2", color: "white" }}>Yes, share!</button>
                        </div>
                    </ConfirmationContainer>
                </Confirming>
                : ""}
            <RiRepeatFill className="icone" onClick={() => setConfirming(true)} />
            <p className="retweet-count">{retweetCount} re-posts</p>
        </Container >
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .icone{
        font-size: 15px;
        margin-bottom:1px;

    }

    .retweet-count{  
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
    }

    @media (min-width: 376px) {

        .icone{
            font-size: 20px;
        }

        .retweet-count{
            font-size: 11px;
        }
    }
`

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
