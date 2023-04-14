

import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Nav, Navbar, Container } from 'react-bootstrap';

function NaviBar () {
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

export default NaviBar;