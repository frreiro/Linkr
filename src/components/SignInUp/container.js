import styled from 'styled-components';

export const Container = styled.main`
    height: 64vh;
    background-color: #333333;
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40px;
    }
    input, button{
        width: 330px;
        height: 55px;
        border: none;
        border-radius: 6px;
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 22px;
    }
    input::placeholder, button{
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 22px;
        color: #9F9F9F;
    }
    input{
        margin-bottom: 11px;
        background: #FFFFFF;
        color: #9F9F9F;
        padding-left: 17px;

    }
    button{
        background: #1877F2;
        margin-bottom: 21px;
        color: #FFFFFF;
    }
    a{
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        text-decoration: none;
        color: white;
    }
    @media only screen and (min-width: 935px) {
        width: 35vw;
        height: 100vh;
        
        form{
            margin-top: 50%;
        }
    }
`
export const Desktop = styled.main`
    @media only screen and (min-width: 935px) {
        display: flex;
    }
`