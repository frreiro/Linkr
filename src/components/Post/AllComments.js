import styled from "styled-components"

export default function AllComments({comments}){
    return(
        <>
        {comments.map((e, i)=>{ 
            return(
                <>
                <Container key={i}>
                    <img src={e.image}/>
                    <h1>{e.userName}</h1>
                    <h2>{e.comment}</h2>
                    <div className="line"></div>
                </Container>
                </>
             ) 
        })}
        </>
    )
}

const Container = styled.div`
    position: relative;
    width: 611px;
    height: 71px;
    margin-left: -85px;
    margin-top: 15px;;
    display: flex;
    

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
`