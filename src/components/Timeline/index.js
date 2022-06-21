import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import Main from '../Main';
import axiosInstance from '../../instances/axiosInstances';

export default function Timeline() {

    const [posts, setPosts] = useState([])
    const [response, setResponse] = useState(0)
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
                promise.data.length !== 0 ? setPosts(promise.data) : setResponse(1)
                setTimeout(() => setRefresh(!refresh), 5000)
            })
            .catch(e => setResponse(2));
    }, [refresh])

    return (
        <>
            <Main pageTitle={"timeline"} posts={posts} response={response} />
        </>
    )
}
