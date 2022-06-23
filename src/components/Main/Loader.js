import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

export default function Loader() {
    return (
        <LoaderDiv>
            <Oval ariaLabel="loading-indicator" height={36} width={36} strokeWidthSecondary={1} color="#6D6D6D" secondaryColor="#333333" />
            <h1>Loading more posts...</h1>
        </LoaderDiv>
    )
}

const LoaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    h1{
        margin-top: 16px;
        color: #6D6D6D;
        font-size: 16px;
    }

    @media (min-width: 376px){
        h1{
        font-size: 22px;
    }
    }
`