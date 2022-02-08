import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const AppNavbar = () => {
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Carnets de Notes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                    Accueil
                </Nav.Link>                    
                <Nav.Link as={Link} to="/parametres">
                    Paramètres
                </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
        </>
    );
};

export default AppNavbar;