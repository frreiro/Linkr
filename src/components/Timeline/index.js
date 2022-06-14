import react from "react";
import styled from "styled-components"
import Post from "../Post";

export default function Timeline() {
    return (
        <Container>
            <div className="timeline">
                <h1>timeline</h1>
            </div>
            <Post />
            <Post />
            <Post />
            <Post />

        </Container>
    )
}

const Container = styled.div`
    background-color: #4D4D4D;
    display: flex;
    flex-direction: column;
    align-items: center;

    .timeline{
        width: 611px;
        font-size: 43px;
        font-weight: 700;
        color: #fff;
        text-align: left;
        margin-bottom: 43px;
    }
`
