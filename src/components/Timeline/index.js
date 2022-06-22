import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import Main from '../Main';
import axiosInstance from '../../instances/axiosInstances';

export default function Timeline() {

    const [posts, setPosts] = useState([])
    const [response, setResponse] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    useEffect(() => {
        axiosInstance.get(`/timeline?page=${pageNumber}`, config)
            .then(({ data: newPosts }) => {
                if (newPosts.length === 0 && pageNumber !== 0) setHasMore(false)
                newPosts.length !== 0
                    ? setPosts([...posts, ...newPosts])
                    : setResponse(1)
            })
            .catch(e => {
                if (e.response.status === 404 && e.response.data === "No followers found") {
                    setResponse(3)
                } else setResponse(2)
            });
    }, [pageNumber])

    return (
        <>
            <Main pageTitle={"timeline"}
                posts={posts} response={response}
                setPage={setPageNumber}
                page={pageNumber}
                hasMore={hasMore}
            />
        </>
    )
}
