import { useState } from "react"
import {FiSend} from "react-icons/fi"
import styled from "styled-components"
import { useContext } from "react";
import DataContext from "../context/context";
import axiosInstance from "../../instances/axiosInstances";

export default function CommentsBar({postId, viewComments}){

    const [comment, setComment] = useState("")
    const { data, setData } = useContext(DataContext);
    const {image} = data
    const token = localStorage.getItem('token');
    // const token = "9829093e-5533-408f-9dc2-fe35881e3c27"
    const url = "/comments"
    // const url = "http://localhost:5000/comments"
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    async function sendComment(){
        try {
            const promisse = await axiosInstance.post(url, {postId: 1, comment}, config)
            console.log(promisse.data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        viewComments ?
        <ContainerWriter>
            <img src={image}/>
            <input  value={comment} 
                    onChange={(e)=>setComment(e.target.value)}
                    type="text"
                    placeholder="Write a comment"></input>
            <FiSend onClick={()=>sendComment()} className="send"/>
        </ContainerWriter>
        :
        <p><></></p>
    )   
}

const ContainerWriter = styled.section`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
    margin-left: -80px;
    width: 611px;

    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
    input{
        width: 510px;
        height: 39px;
        background: #252525;
        border-radius: 8px;
    }
    .send{
        position: absolute;
        right: 30px;
    }
`