import { useEffect, useState } from "react"
import {FiSend} from "react-icons/fi"
import styled from "styled-components"
import { useContext } from "react";
import DataContext from "../context/context";
import axiosInstance from "../../instances/axiosInstances";
import AllComments from "./AllComments";

export default function CommentsBar({postId, viewComments}){

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [load, setLoad] = useState(false)
    const { data, setData } = useContext(DataContext);
    const {image} = data
    const token = localStorage.getItem('token');
    const url = "/comments"
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    async function sendComment(){
        try {
            const promisse = await axiosInstance.post(url, {postId, comment}, config)
            setLoad(!load)
            console.log(promisse.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    async function listComments(){
        try {
            const promisse = await axiosInstance.get(`${url}/${postId}`,config)
            setComments(promisse.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        listComments()
    },[load])

    return(
        viewComments ?
        <>
        <AllComments comments={comments}/>
        <ContainerWriter>
            <img src={image}/>
            <input  value={comment} 
                    onChange={(e)=>setComment(e.target.value)}
                    type="text"
                    placeholder="Write a comment"></input>
            <FiSend onClick={()=>sendComment()} className="send"/>
        </ContainerWriter>
        </>
        :
        <><></></>
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

    @media only screen and (max-width: 435px) {
        width: 300px;
        input{
            width: 300px; 
        }
    }
`