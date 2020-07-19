import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#mmda">Navbar</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link className='active' href="#home">Create Ad</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;