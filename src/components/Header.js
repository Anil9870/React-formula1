import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <div className="nav-bar">
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="/home"><h1>F!</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/home">
                <h4>HOME</h4>
              </NavLink>
              <NavLink className="nav-link" to="/drivers">
                <h4>DRIVERS</h4>
              </NavLink>
              <NavLink className="nav-link" to="/constructors">
                <h4>CONSTRUCTORS</h4>
              </NavLink>
              <NavLink className="nav-link" to="/drivers-standings">
                <h4>DRIVER_STANDINGS</h4>
              </NavLink>
              <NavLink className="nav-link" to="/constructors-standings">
                <h4>CONSTRUCTORS_STANDINGS</h4>
              </NavLink>
              <NavLink className="nav-link" to="/tracks">
                <h4>TRACKS</h4>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}



export default Header;
