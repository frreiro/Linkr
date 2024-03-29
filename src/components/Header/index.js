import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SearchBar from './SearchBar.js';
import DataContext from '../context/context.js';
import axiosInstance from '../../instances/axiosInstances.js';

export default function Header() {
  const { data, setData } = React.useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const defaultPic =
    'https://w1.pngwing.com/pngs/933/945/png-transparent-social-media-icons-avatar-user-profile-login-black-circle-silhouette-symbol.png';

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('url');
    navigate('/');
  }

  React.useEffect(() => {
    const usertoken = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    };

    axiosInstance
      .get('/data', config)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container>
        <h1 onClick={() => navigate('/timeline')}>linkr</h1>
        <SearchBar />
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          <img src={data?.image || defaultPic} alt="Foto do perfil" />
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
  position: fixed;
  width: 100vw;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #151515;
  color: #fff;
  padding: 0.6rem;
  z-index: 999;
  h1 {
    font-family: 'Passion One', sans-serif;
    font-weight: 700;
    font-size: 3rem;
    margin-left: 1.5rem;
    cursor: pointer;
  }
  input {
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
  .searchBar {
    position: relative;
    z-index: 99;
  }
  .result {
    position: absolute;
    z-index: 98;
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
  .searchResult {
    font-family: 'Lato';
    font-size: 19px;
    color: #515151;
    margin-left: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .searchResult h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #C5C5C5;
  }
  .searchResult img {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 860px){
    position: relative;
    top: 0;
    left: 0;
    .searchBar{
      position: absolute;
      top: 85px;
      left: calc(50% - 281.5px);
    }
  }

  @media (max-width: 375px){
    .searchBar{
      width: 350px;
      left: calc(50% - 175px);
    }
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
