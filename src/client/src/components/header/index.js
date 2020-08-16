import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../user-context';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    static contextType = UserContext;

    logOut = () => {
        this.context.logOut();
        this.props.history.push('/');
    }

    render() {
        const {
            loggedIn,
            user
        } = this.context;
        const profileUrl = `/profile/${user && user.id}`;

        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand as={Link} to="/"><strong>Auto</strong>Hub</Navbar.Brand>
                <Nav className="ml-auto">
                        {loggedIn 
                        ? 
                        <>
                            <Nav.Link as={Link} to="/createAd" className='active'>Create Ad</Nav.Link>
                            <Nav.Link as={Link} to={profileUrl} className='active'>Hello, {user.firstName}</Nav.Link> 
                            <Nav.Link as={Link} onClick={this.logOut} to="#" className='active'>Logout</Nav.Link>
                        </>
                        : 
                        <>
                            <Nav.Link as={Link} to="/login" className='active'>Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className='active'>Register</Nav.Link>
                        </>}
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Header);