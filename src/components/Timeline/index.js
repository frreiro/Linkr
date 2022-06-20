import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import Main from '../Main';
import axiosInstance from '../../instances/axiosInstances';

export default function Timeline() {

    const loader = <Oval ariaLabel="loading-indicator" height={50} width={50} strokeWidthSecondary={1} color="#ffffff" secondaryColor="#333333" />
    const errorMessage = <errorCase >An error occured while trying to fetch the posts, please refresh the page</errorCase>
    const notFound = <errorCase >There are no posts yet</errorCase>

    const [posts, setPosts] = useState([])
    const [response, setResponse] = useState(loader)
    const [refresh, setRefresh] = useState(false)


    const token = localStorage.getItem('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        axiosInstance.get('/timeline', config)
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
            <Main pageTitle={"timeline"} posts={posts} response={response} />
        </>
    )
}
const errorCase = styled.h1`
    text-align: center;
`
