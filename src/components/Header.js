import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { GiF1Car } from "react-icons/gi";
import { NavLink } from "react-router-dom";


const Header = props => {
  return (
    <div className="nav-bar">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home"><GiF1Car size={90} /></Navbar.Brand>
          <Nav className="me-auto">
            {/* <NavLink className="nav-link" to="/home">
              <BsFillPersonBadgeFill size={30} /> HOME
            </NavLink> */}
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
        </Container>
      </Navbar>
    </div>
  )
}



export default Header;
