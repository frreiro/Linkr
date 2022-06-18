import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from 'axios'
import { Oval } from "react-loader-spinner";

import { Header } from "../Header";
import Post from "../Post";


export default function Timeline() {

    const loader = <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidthSecondary={1} color="#ffffff" secondaryColor="#333333" />
    const errorMessage = <h1 className="response">An error occured while trying to fetch the posts, please refresh the page</h1>
    const notFound = <h1 className="response">There are no posts yet</h1>

    const [posts, setPosts] = useState([])
    const [response, setResponse] = useState(loader)
    const [refresh, setRefresh] = useState(false)

    const token = localStorage.getItem('token')

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/timeline', config)
            .then(promise => {
                promise.data.length !== 0 ? setPosts(promise.data) : setResponse(notFound)
                setTimeout(() => setRefresh(!refresh), 5000)
            })
            .catch(e => setResponse(errorMessage));
    }, [refresh])


    if (posts.length > 0 && Object.keys(posts[0]).length < 0) {
        setResponse(notFound)
    }
    return (
        <>
            <Header />
            <Container>
                <div className="timeline">
                    <h1>timeline</h1>
                </div>
                {posts.length > 0 && Object.keys(posts[0]).length > 0 ? posts.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            userImage={post.userImage}
                            userName={post.userName}
                            postDescription={post.postDescription}
                            linkInfos={post.linkInfo}
                        />
                    )
                }) : response}
            </Container>
        </>

    )
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-top: 78px;
    align-items: center;
    
    .timeline{
        width: calc(100vw - 17px);
        font-family: 'Oswald';
        font-size: 43px;
        font-weight: 700;
        color: #fff;
        margin-left: 17px;
        margin-bottom: 43px;
    }

    .response{
        text-align: center
        /* margin-left: 17px; */
    }

    @media(min-width: 376px){
        .timeline{
            width: 611px;
        }
    }
`
