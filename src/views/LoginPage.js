import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const nagivate = useNavigate();

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            nagivate('/')
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        <h1>Log-in to your account</h1>
        {error && <p className = "error">{error}</p>}
        <input
            placeholder='Enter your email here.'
            value={email}
            onChange={ e => setEmail(e.target.value)}/>
        <input
            type="password"
            placeholder='Enter your password.'
            value={password}
            onChange={ e => setPassword(e.target.value)}/>
        <button onClick={login}>Log In</button>
        <Link to="/create-account">Don't have an account? Create one here...</Link>
        </>
    );
}

export default LoginPage;