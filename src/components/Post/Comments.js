import styled from "styled-components"
import {AiOutlineComment} from "react-icons/ai"

export default function Comments({viewComments, setViewComments,commentsCount}){
   
    return(
        <Box>
            <AiOutlineComment onClick={()=>setViewComments(!viewComments)}/>
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
    font-family: 'Lato';

    p{
        top: 108px;
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        width: 100%;
    }
`

