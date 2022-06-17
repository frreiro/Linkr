import styled from 'styled-components'
import React, { useState } from 'react'
import axios from 'axios'

export default function PublishPost(props) {
    const URL = "http://localhost:5000/posts"

    const {refresher} = props

    const [shareURL, setShareURL] = useState("")
    const [shareDescription, setShareDescription] = useState("")
    const [disabled, setDisabled] = useState(false)

    // TODO Get username, token and image from context/storage
    const username = "tek"
    const token = "efe4b76a-a6e7-43e1-b20d-e777f5ff9bd8"
    const image = "https://pbs.twimg.com/profile_images/1389140738827501568/RUeCH5Dg_400x400.jpg"
    

    function disableAndSend(e) {
        e.preventDefault()
        setDisabled(true)

        if (shareURL) {
            sendPost()
        } else {
            setDisabled(false)
        }
    }

    function sendPost() {

        const bodyData = {
            username,
            url: shareURL,
            description: shareDescription
        }

        const userData = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const promise = axios.post(URL, bodyData, userData)

        promise.catch(err => {
            alert("Houve um erro ao publicar seu link.")
            setDisabled(false)
        })

        promise.then(response => {
            setShareURL("")
            setShareDescription("")
            setDisabled(false)
            refresher()
        })
    }

    return (
        <Container>
            <ProfilePic>
                <img src={image} />
            </ProfilePic>
            
            <InfoContainer>
                <Share>What are you going to share today?</Share>
                <PostInfo>
                    <form onSubmit={disableAndSend} style={disabled ? {opacity: '0.5'} : {}} disabled={disabled ? "disabled" : ""}>
                        <input type="text" 
                            value={shareURL}
                            onChange={(e) => setShareURL(e.target.value)} 
                            placeholder="http://..."
                            ></input>
                        <textarea type="text" 
                            value={shareDescription}
                            onChange={(e) => setShareDescription(e.target.value)}  
                            placeholder="Awesome article about #javascript" 
                            rows="3"
                            ></textarea>
                        
                        <Publish>
                            <button type="submit">{disabled ? "Publishing..." : "Publish"}</button>
                        </Publish>
                    </form>
                </PostInfo>
            </InfoContainer>
        </Container>
    )
}

const Container = styled.section`
    width: 100vw;
    height: auto;
    display: flex;

    background: white;
    margin-bottom: 16px;
    padding: 10px 15px;

    @media(min-width: 376px){
        width: 611px;
        border-radius: 16px;
    }
`

const ProfilePic = styled.div` 
    display: none;

    @media(min-width: 376px) {
        display: block;
        width: 50px;
        height: 50px;
        margin-right: 15px;

        img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 26.5px;
        }
    }
    
`

const InfoContainer = styled.div`
    width: 100%;
`

const Share = styled.div`
    color: #707070;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;

    
    @media(min-width: 376px) {
        justify-content: left;
        align-items: left;
    }
`

const PostInfo = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;

    form {
        width: 100%;
    }

    input {
        width: 100%;
        height: auto;

        padding: 10px;
        margin-top: 5px;
        border-radius: 5px;
        background: #EFEFEF;
    
        color: black;
        ::placeholder {
            color: #949494;
        }
    }

    textarea {
        width: 100%;
        height: auto;

        padding: 10px;
        margin-top: 5px;
        border-radius: 5px;
        background: #EFEFEF;
    
        color: black;
        ::placeholder {
            color: #949494;
        }
    }
`

const Publish = styled.div`
    width: 100%;
    display: flex;
    justify-content: right;

    margin: 10px 0 3px;
    button {
        width: 100px;
        height: 30px;

        background: #1877F2;
        border-radius: 5px;
        font-size: 13px;
    }
`