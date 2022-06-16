import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

import Header from "./Header";
import { Container } from './container';

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const url = "http://localhost:5000/signin"
    const navigate = useNavigate()


    function logInUser(e) {
        e.preventDefault()

        const data = {
            email,
            password
        }
        const promisse = axios.post(url, data)
        promisse.then(response => {

            const token = response.data
            localStorage.setItem("token", token)
            navigate("/timeline")
        })
        promisse.catch(e => {
            alert(e.response.data)
            console.log(e)
        })
    }
    return (
        <>
            <Header />
            <Container>
                <form onSubmit={logInUser}>

                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    ></input>

                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    ></input>

                    <button type="submit">Log In</button>
                    <Link to="/sign-up">First time? create an account!</Link>
                </form>
            </Container>
        </>
    )
}
