import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "./header.css";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/actions/authActions";
import { selectCurrentUser } from "../../redux/selectors/authSelector";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="header-container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Bau-Lecturater</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/lectures">Lectures</Nav.Link>
            <Nav.Link href="/teachers">Teachers</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link onClick={() => dispatch(logout())}>Log out - {currentUser.displayname}</Nav.Link>
            ) : (
              <Nav.Link href="/sign-in-sign-up">Sign In/Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
