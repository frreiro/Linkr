import styled from "styled-components"
import { useContext } from "react";
import DataContext from "../context/context";

export default function AllComments({comments, follows}){
    const { data, setData } = useContext(DataContext);
    const name=data.name
    return(
        <BoxComment>
        {comments.map((e, i)=>{ 
            let status
            for(let i = 0; i<follows.length; i++){
                console.log(e.usercom, follows[i].follow)
                if(e.usercom === follows[i].follow){
                    status = "• following"
                }
            }
            status = e.published === e.usercom ? "• post’s author" : status
            return(
                <>
                <Container key={i}>
                    <img src={e.image}/>
                    <h1>{e.userName}<span>{status}</span></h1>
                    <h2>{e.comment}</h2>
                    <div className="line"></div>
                </Container>
                </>
             ) 
        })}
        </BoxComment>
    )
}

const BoxComment=styled.section`
    margin-top: 20px;
`

const Container = styled.div`
    position: relative;
    width: 611px;
    height: 71px;
    margin-left: -85px;
    display: flex;
    background-color: #1E1E1E;
    

    img{
        position: absolute;
        left: 25px;
        top: 16px;
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }

    h1, h2{
        position: absolute;
        left: 82px;
        font-family: 'Lato';
        font-style: normal;
        font-size: 14px;
    }
    
    h1{
        top: 12px;
        font-weight: 700;
    }

    h2{
        top: 32px;
        font-weight: 400;
    }

    .line{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: #353535;
        height: 1px;
        width: 571px;
    }
    span{
        margin-left: 8px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #565656;
    }
`