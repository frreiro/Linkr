import styled from 'styled-components';
// import Container from './container';

export default function Header() {
  return (
    <Container>
      <h1>Linkr</h1>
      <h2>Save, share and discover</h2>
      <h2>the best links on the web</h2>
    </Container>
  );
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
    @media only screen and (min-width: 935px) {
        width: 65vw;
        height: 100vh;  
        align-items: flex-start;
        h1,h2{
            margin-left: 18vw;
            font-size: 43px;
        }
        h1{
            font-size: 126px;
        }

    }
`
