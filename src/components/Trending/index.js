import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import DataContext from '../context/context.js';

export default function Trending() {

    //TODO: pegar o token corretamente
    const token = localStorage.getItem('token')
    const {data, setData} = useContext(DataContext)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }


    const [hashtags, setHashtags] = useState("");


    useEffect(() => {
        axios.get('http://localhost:5000/hashtags', config)
            .then(({ data }) => setHashtags(data))
            .catch((e) => console.log(e))
    }, [])

    //TODO: clique para a tela de hashtags
    return (
        <Topics>
            <h1>trending</h1>
            <hr />
            <Hashtags>
                {hashtags ? hashtags.map((item) => {
                    return <p key={item.id}># {item.hashtag}</p>
                }) : <></>}
            </Hashtags>
        </Topics>
    )
}

const Topics = styled.div` 
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    margin-top: 160px;
    margin-left: 25px;

    
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 27px;
        color: #fff;
        margin-top: 12px;
        margin-left: 16px;
        margin-bottom: 12px;
    }
    
    hr{
        height: 1px;
        background-color: #484848;
    }

    @media (max-width: 376px) {
        display: none;
    }

`

const Hashtags = styled.div`

    margin-top: 20px;
    margin-left: 18px;

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 15px;
    }

`