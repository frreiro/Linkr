import styled from "styled-components"
import axiosInstance from "../../instances/axiosInstances"
import {IoChatbubblesOutline} from "react-icons/io5"
import { useEffect } from "react"

export default function Comments({viewComments, setViewComments,commentsCount}){
    return(
        <Box>
            <IoChatbubblesOutline onClick={()=>setViewComments(!viewComments)}/>
            <p>{commentsCount} comments</p>
        </Box>
    )
}

const Box = styled.div`
    position: absolute;
    left: 15px;
    top: 180px;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        margin-top: 10px;
        top: 108px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        width: 100%;
    }
`

