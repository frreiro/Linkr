import styled from 'styled-components';

export const Container = styled.main`
  height: 64vh;
  background-color: #333333;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
  }
  input,
  button {
    width: 330px;
    height: 55px;
    border: none;
    border-radius: 6px;
  }
  input::placeholder,
  button {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 22px;
    padding-left: 17px;
    color: #9f9f9f;
  }
  input {
    margin-bottom: 11px;
    background: #ffffff;
    color: #9f9f9f;
  }
  button {
    background: #1877f2;
    margin-bottom: 21px;
    color: #ffffff;
  }
  a {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 17px;
    text-decoration: none;
    color: white;
  }
`;
