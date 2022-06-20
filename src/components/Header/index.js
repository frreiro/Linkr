import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SearchBar from './SearchBar';
import DataContext from '../context/context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }
  console.log(focus);
  return (
    <>
      <Container>
        <h1>linkr</h1>
        <SearchBar />
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          <img
            src="https://s2.glbimg.com/q1ZgqfWQGKQyxtRoMoRK03gMVfk=/0x0:959x540/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/h/J/Ui4XL0So6yEilj6DeGXg/memedoge.jpg"
            alt="Foto do perfil"
          />
        </div>
      </Container>
      {isMenuOpen && (
        <Menu>
          <p onClick={handleLogout}>Logout</p>
        </Menu>
      )}
    </>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #151515;
  color: #fff;
  padding: 0.6rem;
  h1 {
    font-family: 'Passion One', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    margin-left: 1.5rem;
  }
  input{
    width: 563px;
    height: 45px;
    color: black;
    position: relative;
    border-radius: 8px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1.5rem;
    svg {
      font-size: 1.5rem;
    }
    img {
      width: 55px;
      height: 55px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .searchBar{
    position: relative;
  }
  .result{
    position: absolute;
    top: 38px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 563px;
    background-color: #e7e7e7;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .searchResult{
    font-family: 'Lato';
    font-size: 19px;
    color: #515151;
    margin-left: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .searchResult img{
    width: 35px;
    height: 35px;
  }
`;

const Menu = styled.button`
  display: grid;
  place-items: center;
  width: 150px;
  height: 50px;
  background-color: #151515;
  border-radius: 1rem 0 0 1rem;
  border: none;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  position: absolute;
  right: 0;
  cursor: pointer;
`;
