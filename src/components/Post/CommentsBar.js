import { useState } from "react"
import {FiSend} from "react-icons/fi"
import styled from "styled-components"
import { useContext } from "react";
import DataContext from "../context/context";

export default function CommentsBar({viewComments}){

    const { data, setData } = useContext(DataContext);
    const {image} = data

    return(
        viewComments ?
        <ContainerWriter>
            <img src={image}/>
            <input placeholder="Write a comment"></input>
            <FiSend className="send"/>
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