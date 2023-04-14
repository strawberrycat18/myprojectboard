import React, { useEffect} from "react";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

export default function NaviBar() {
    const [user, loading] =useAuthState(auth);
    const navigate =useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [navigate, user, loading]);

        return (
            <>
                <Navbar variant="light" bg="light">
                    <Container>
                        <Navbar.Brand href="/">Project Not "Boring"</Navbar.Brand>
                        <Nav>
                            <Nav.Link href="/">Projects</Nav.Link>
                            <Nav.Link onClick={(e) => signOut(auth)}>Sign Out</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
}


