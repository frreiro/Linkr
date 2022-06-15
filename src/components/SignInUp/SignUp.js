import React from "react";
import { Link } from 'react-router-dom';
import Header from "./Header";
import { Container } from './container';

export default function SignUp(){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState('');

    function sendObj(e){
        e.preventDefault()
    }

    return(
        <>
            <Header />
            <Container>
                <form onSubmit={sendObj}>
                    <input type='text' placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type='text' placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type='text' placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type='text' placeholder="picture url" value={image} onChange={e => setImage(e.target.value)}/>
                    <button type="submit">Sign Up</button>
                    <Link to="/">Switch back to log in</Link>
                </form>
            </Container>
        </>
    );
}