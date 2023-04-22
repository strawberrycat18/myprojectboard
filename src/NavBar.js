import React, { useEffect} from "react";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Nav, Navbar, Stack } from 'react-bootstrap';
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
                <Navbar class="mb-3 py-1" variant="light" bg="light" >
                        <Stack direction="horizontal" gap={5}>
                            <div>
                                <Navbar.Brand href="/">Project Not "Boring"</Navbar.Brand>
                            </div>
                            <div className="mx-1">
                                <Nav.Link href="/">Projects</Nav.Link>
                            </div>
                            <div>
                                <Nav.Link onClick={(e) => signOut(auth)}>Sign Out</Nav.Link>
                            </div>
                        </Stack>
                </Navbar>
            </>
        );
}


