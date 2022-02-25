import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Container,
  NavDropdown,
  FormControl,
  Form,
  Nav,
  Button,
} from 'react-bootstrap';

function InnerHeader() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate(`/home`);
  };
  const fullname = localStorage.getItem('fullname');

  // localStorage.getItem('token');

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">FinBlog</Navbar.Brand>
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link as={Link} to={`/home`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={`/timeline`}>
              Timeline
            </Nav.Link>
            <Nav.Link as={Link} to={`/friends`}>
              Friends
            </Nav.Link>
            <NavDropdown
              title={fullname}
              id="navbarScrollingDropdown"
              className="showuser"
            >
              <NavDropdown.Item as={Link} to={`/profile`}>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/setting`}>
                Setting
              </NavDropdown.Item>
              {/*  <NavDropdown.Item as={Link} to={`/changePassword`}>
                Change Password
              </NavDropdown.Item> */}
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default InnerHeader;
