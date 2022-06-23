import styled from "styled-components"
import axiosInstance from "../../instances/axiosInstances"
import {IoChatbubblesOutline} from "react-icons/io5"
import { useEffect } from "react"

export default function Comments({setViewComments}){
    
    return(
        <Box>
            <IoChatbubblesOutline onClick={setViewComments}/>
            <p>comments</p>
        </Box>
    )
}

const Box = styled.div`
    position: absolute;
    left: 25px;
    top: 190px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        font-size: 8px;
    }
`

