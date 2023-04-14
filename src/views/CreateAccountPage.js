import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function CreateAccountPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword){
                setError('Password and confirm password do not match');
                setPassword("")
                setConfirmPassword("")
                return;
            }

            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        <Container>
            <h1 className="my-3">Sign up for an account</h1>
            {error && <p className="error">{error}</p>}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter your email."
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
                    placeholder="Password"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Re-key your Password"
                    value={confirmPassword}
                    onChange={ e => setConfirmPassword(e.target.value)}
                    />
                   
                    <a href="/login">Have an existing account? Login here.</a>
                    </Form.Group>
                    
                
                <Button
                    variant='primary'
                    onClick={createAccount}>
                        Create Account
                </Button>
            </Form>
        </Container>
        </>
    );

}
