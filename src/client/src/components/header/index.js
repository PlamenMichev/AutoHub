import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
            <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/create" className='active'>Create Ad</Nav.Link>
                    <Nav.Link as={Link} to="/login" className='active'>Login</Nav.Link>
                    <Nav.Link as={Link} to="/register" className='active'>Register</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;