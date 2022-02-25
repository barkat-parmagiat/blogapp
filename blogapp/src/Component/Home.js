import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  NavDropdown,
  FormControl,
  Nav,
  Button,

} from 'react-bootstrap';
import financeImage from '../assets/Images/financeImage.png';
import ReactPlayer from 'react-player';

function Home() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">FinBlog</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="m-2">
              <Link as={Link} to={'/registration'}>
                <Button className="btn btn-primary signup">Sign up</Button>
              </Link>
            </Navbar.Text>
            <Navbar.Text className="m-2">
              <Link as={Link} to={'/login'}>
                <Button className="btn btn-primary signin">Sign in</Button>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="gcolor">
        <Container>
          <div className="row  h1d p-10">
            <div className="col-md-6 m-auto">
              <h1>FinBlog</h1>
              <h5>
                Being good at finances is all about education. Whether you’re
                new to staying on top of your finances or need some fresh
                inspiration to grow your wealth, you can turn to finance and
                investment blogs to educate you on all things on finance.
              </h5>
            </div>
            <div className="col-md-6">
              <img src={financeImage} alt="homeBanner" />
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="row p-10">
          <div className="col-md-5">
            <ReactPlayer url="https://youtu.be/nbrkmJTuGoY" />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <ReactPlayer url="https://youtu.be/LhCO_76iH7I" />
          </div>
        </div>
      </Container>
      <footer p-2>
        <p>Designed & Developed by Barkat</p>
      </footer>
    </>
  );
}

export default Home;
