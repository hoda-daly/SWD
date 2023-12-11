import React from "react";
import "./Navs.css";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const Navs = () => {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-logo">
            Documentation System
          </Link>
        </Navbar.Brand>

        <LinkContainer to="/Files">
          <Nav.Link className="ml-auto  nav-item">All Files</Nav.Link>
        </LinkContainer>

        <Nav className="ml-auto  nav-item">
          <NavDropdown title="SDLC" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="./Initiation" className="nav-item">
                Initiation Phase
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="./Requirments" className="nav-item">
                Analysis Phase
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="./Design" className="nav-item">
                Design Phase
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navs;
