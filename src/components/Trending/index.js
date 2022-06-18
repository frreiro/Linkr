import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Trending() {

    //TODO: pegar o token corretamente
    const token = localStorage.getItem('token')

    const config = {
        headers: {
            "Authorization": `Bearer ${123}`
        }
    }


    const [hashtags, setHashtags] = useState("");
    console.log(hashtags)


    useEffect(() => {
        axios.get('http://localhost:5000/hashtags', config)
            .then(({ data }) => setHashtags(data))
            .catch((e) => console.log(e))
    }, [])


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
        margin-top: 9px;
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

    margin-top: 22px;
    margin-left: 16px;

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        margin-bottom: 15px;
    }

`