import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
import { Container, Desktop } from './container';

export default function SignUp(){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState('');
    const [button, setButton] = React.useState(false);
    const navigate = useNavigate();

    function sendObj(e){
        e.preventDefault();
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        let imageRegex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i
        if(email !== '' && emailRegex.test(email) && password !== '' && username !== '' && image !== '' && imageRegex.test(image)){
            setButton(true);
            let obj = {
                email: email,
                password: password,
                username: username,
                image: image
            }
            let promisse = axios.post('http://localhost:5000/signup', obj);
            promisse.then(() => navigate('/'));
            promisse.catch((e) => {
                if(e.response.status === 409){
                    alert("E-mail já cadastrado");
                    setButton(false);
                } else {
                    alert("Ocorreu um erro. Tente novamente mais tarde");
                    setButton(false);
                }
            });
        } else {
            alert("Preencha os campos corretamente");
            setButton(false);
        }
    }

    return(
        <>
            <Desktop>
            <Header />
            <Container>
                <form onSubmit={sendObj}>
                    <input type='text' placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type='password' placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type='text' placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type='text' placeholder="picture url" value={image} onChange={e => setImage(e.target.value)}/>
                    <button type="submit" disabled={button}>Sign Up</button>
                    <Link to="/">Switch back to log in</Link>
                </form>
            </Container>
            </Desktop>
        </>
    );
}