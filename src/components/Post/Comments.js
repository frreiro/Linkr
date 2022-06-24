import styled from "styled-components"
import { AiOutlineComment } from "react-icons/ai"

export default function Comments({ viewComments, setViewComments, commentsCount }) {
    return (
        <Box>
            <AiOutlineComment className="icone" onClick={() => setViewComments(!viewComments)} />
            <p>{commentsCount} comments</p>
        </Box>
    )
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .icone{
        font-size: 15px;
        margin-bottom:1px;

    }

    p{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 11px;
        margin-bottom: 10px;
    }

    @media (min-width: 376px) {

        .icone{
        font-size: 20px;
        }
     
        p{  
            margin-bottom: 15px;
            font-size: 11px;
        }
    }

`

