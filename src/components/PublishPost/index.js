import styled from 'styled-components'
import React, { useState } from 'react'

export default function PublishPost() {
    const URL = "http://localhost:5000/posts"

    const [shareURL, setShareURL] = useState("")
    const [shareDescription, setShareDescription] = useState("")

    function sendPost(e) {
        e.preventDefault()

    }

    return (
        <Container>
            <Share>What are you going to share today?</Share>
            <PostInfo>
                <form onSubmit={sendPost}>
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
                        <button type="submit">Publish</button>
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