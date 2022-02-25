import React, { useState } from 'react';
//for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  Link,
  useNavigate,
  Redirect,
  Navigate,
  Router,
} from 'react-router-dom';
import { Form, Button, Container, Navbar } from 'react-bootstrap';
import { login } from '../services/authservice';
import { showAlert } from './../util/alertModal';

const Login = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('_id');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  // const navigate = useNavigate();

  //form validation scheme
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    //acceptTerms: Yup.bool().oneOf([true], 'Accept Ts & Cs is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  if (token) {
    // navigate(`/timeline`);
    return <Navigate to={`/timeline`} />;
  }

  const loginEvent = async (data) => {
    console.log(data);
    setIsButtonLoading(true);
    let authPayload = {
      email: data.email,
      password: data.password,
      fullname: data.fullname,
    };
    try {
      setIsButtonLoading(false);
      let login_res = await login(authPayload);

      if (login_res?.success) {
        localStorage.setItem('token', login_res?.data?.token);
        localStorage.setItem('email', login_res?.data?.email);
        localStorage.setItem('fullname', login_res?.data?.fullname);
        localStorage.setItem('_id', login_res?.data?._id);
        showAlert('Login successfull');
        Navigate(`/timeline`);
      }
      console.log('succss', login_res);
    } catch (err) {
      console.log(err);
      showAlert('Login error', true);
      setIsButtonLoading(false);
    }
  };

  return (
    <>
      <Router>
        <Navbar>
          <Container>
            <Navbar.Brand>FinBlog</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link as={Link} to={'/registration'}>
                  <Button className="btn btn-primary">Registration</Button>
                </Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Router>
      <div className="logback">
        <Container>
          <div className="whiteLayout">
            <h1>Login</h1>

            <Form onSubmit={handleSubmit(loginEvent)}>
              <Form.Control
                size="sm"
                id="text-field"
                name="email"
                type="text"
                placeholder="Email Address"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
              <Form.Control
                size="sm"
                id="text-field"
                type="password"
                name="password"
                placeholder="Password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
              <Form.Check
                type="checkbox"
                aria-label="radio 1"
                label="Remember me"
                className="lbl"
              />

              <Button
                type="submit"
                id="btnn"
                className={`btn btn-primary ${
                  isButtonLoading ? 'loading' : ''
                }`}
                disabled={isButtonLoading}
              >
                LOGIN
              </Button>
            </Form>
            <p>
              If you have no sign up yet!{' '}
              <Link to={'/registration'}>
                <strong>Sign Up</strong>
              </Link>
            </p>
            <p>
              <small>
                Note: Daque ipsa quae ab illo inventore veritatis et quasi
                architecto
              </small>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
