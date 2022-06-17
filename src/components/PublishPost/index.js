import styled from 'styled-components'
import React, { useState } from 'react'
import axios from 'axios'

export default function PublishPost(props) {
    const URL = "http://localhost:5000/posts"

    const {refresher} = props

    const [shareURL, setShareURL] = useState("")
    const [shareDescription, setShareDescription] = useState("")
    const [disabled, setDisabled] = useState(false)

    // TODO Get username and token from context
    const username = "tek"
    const token = "efe4b76a-a6e7-43e1-b20d-e777f5ff9bd8"

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
        </Container>
    )
}

const Container = styled.section`
    width: 100vw;
    height: auto;

    background: white;
    margin-bottom: 16px;
    padding: 10px 15px;

    @media(min-width: 376px){
        width: 611px;
        border-radius: 16px;
    }
`

const Share = styled.div`
    color: #707070;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PostInfo = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;

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