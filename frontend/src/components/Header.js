import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
    const navBarStyles = {
        backgroundColor: '#343434'
    }

    const textStyle = {
        fontFamily: "PT Mono, monospace",
        fontStyle: 'normal',
        color: '#E5E4E2'
    }

    return (
        <div className='mt-1'>
            <Navbar expand="lg" style={navBarStyles}>
                <Navbar.Brand href="/home" className='mx-3'><i class="fa-solid fa-code fa-2x"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={textStyle}>
                    <Nav className="ms-auto mx-5">
                        <LinkContainer to='/'>
                            <Nav.Link><i className="fa-solid fa-house"></i> Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/posts'>
                            <Nav.Link><i class="fa-solid fa-book-open-reader"></i> Blog</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/projects'>
                            <Nav.Link><i class="fa-solid fa-list-check"></i> Projects</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header