import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

import Header from "./Header";
import { Container } from './container';
import { Desktop } from './container';
import Loader from './Loader';

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [butt, setButt] = useState("Log In")
    const url = "http://localhost:5000/signin"
    const navigate = useNavigate()


    function logInUser(e) {
        e.preventDefault()

        const data = {
            email,
            password
        }

        setButt(Loader)

        const promisse = axios.post(url, data)
        promisse.then(response => {
            const { token } = response.data
            localStorage.setItem("token", token)
            alert(response.data)
            setButt("Log In")
            // navigate("/")
        })
        promisse.catch(e => {
            alert(e.response.data)
            console.log(e)
            setButt("Log In")
        })
    }
    return (
        <Desktop>
            <Header />
            <Container>
                <form onSubmit={logInUser}>
                    <input type="text"
                        value={email}
                        disabled={butt !== "Log In" ? true : false}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    ></input>

                    <input type="password"
                        value={password}
                        disabled={butt !== "Log In" ? true : false}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    ></input>

                    <button disabled={butt !== "Log In" ? true : false} 
                            type="submit">{butt}
                    </button>

                    <Link to="/sign-up">First time? create an account!</Link>
                </form>
            </Container>
        </Desktop>
    )
}
