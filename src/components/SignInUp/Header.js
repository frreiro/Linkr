import styled from "styled-components";
import container from "./container";


export default function Header(){
    return(
        <Container>
            <h1>Linkr</h1>
            <h2>Save, share and discover</h2>
            <h2>the best links on the web</h2>
        </Container>
    )
}


const Container = styled.header`
    background: #151515;
    height: 36vh;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 23px;
    font-family: 'Passion One';
    font-weight: 700;
    h1{
        font-size: 76px;
        font-family: 'Oswald';
    }
`