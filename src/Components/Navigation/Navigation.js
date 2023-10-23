import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/logo-sctk.png';
import './navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          {' '}
          <img src={logo} className="rounded" alt="Logo HopePoints" /> SCTK-Links
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-link" href="/" active={location.pathname === '/'}>
              Home
            </Nav.Link>
            <Nav.Link className="navbar-link" href="/about" active={location.pathname === '/about'}>
              About Us
            </Nav.Link>
            <Nav.Link className="navbar-link" href="/form" active={location.pathname === '/form'}>
              Form
            </Nav.Link>
            <Nav.Link className="navbar-link" href="/map" active={location.pathname === '/map'}>
              Map
            </Nav.Link>

            <span>
              <NavLink to="/login">
                <button>
                  <span>Login</span>
                </button>
              </NavLink>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
