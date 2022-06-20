import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  React.useEffect(() => {
    const usertoken = localStorage.getItem('token');

    const URL = 'https://linkr-back-end.herokuapp.com/users/currentuser';
    const config = {
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    };

    axios
      .get(URL, config)
      .then((res) => {
        setUser(res.data); // { id, email, username, image }
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Container>
        <h1>linkr</h1>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          <img src={user?.image || ' '} alt="Foto do perfil" />
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
