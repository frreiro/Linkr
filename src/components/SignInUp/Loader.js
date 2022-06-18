import React from "react";
import styled from "styled-components";
import { Bars } from "react-loader-spinner";

export default function Loader() {
    return (
        <Container>
            <Bars
                align="center"
                heigth="30"
                width="30"
                color='white'
                ariaLabel='loading'
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 55px;
`