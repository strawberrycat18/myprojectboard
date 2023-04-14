import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form} from 'react-bootstrap'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setError("");
        const canLogin = email && password;
        if (canLogin)
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/')
            } catch (e) {
                setError(e.message);
            };
    }

    return (
        <Container>
            <h1 className="my-3">Log-in to your account</h1>
            {error && <p className = "error">{error}</p>}
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter your email here."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Enter your password."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/create-account">Sign up for an account</a>
            </Form.Group>
            <Button
                variant="primary"
                onClick={login}>
                Log In
            </Button>

            </Form>
        </Container>
    );
}