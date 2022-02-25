import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  NavDropdown,
  FormControl,
  Nav,
} from 'react-bootstrap';
import InnerHeader from '../common/InnerHeader';

function Setting() {
  return (
    <>
      <InnerHeader />
      <Container>
        <h1>setting</h1>
      </Container>
    </>
  );
}

export default Setting;
