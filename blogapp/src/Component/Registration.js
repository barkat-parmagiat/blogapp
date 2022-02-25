import React, { useState } from 'react';
//for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Form, Button, Container } from 'react-bootstrap';
import { registration } from '../services/authservice';
import { showAlert } from './../util/alertModal';

const Registration = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const RegistrationValidationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    dob: Yup.string().required('Date of Birth is required'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegistrationValidationSchema),
  });

  const RegistrationEvent = async (data) => {
    console.log(data);
    let authPayload = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confrmPassword: data.confirmPassword,
      dob: data.dob,
    };
    try {
      setIsButtonLoading(false);
      let res = await registration(authPayload);
      console.log(res);
      if (res) {
        showAlert('Registration successfull');
        navigate(`/login`);
      }
    } catch (err) {
      showAlert('Something Wrong Happend', false);
      setIsButtonLoading(false);
    }
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">FinBlog</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to={'/login'}>
                <Button className="btn btn-primary">Login</Button>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Container>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 signup-form">
              <h3>Sign Up</h3>
              <Form onSubmit={handleSubmit(RegistrationEvent)}>
                <Form.Control
                  id="text-field"
                  size="sm"
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  {...register('fullname')}
                  className={`form-control ${
                    errors.fullname ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fullname?.message}
                </div>
                <Form.Control
                  id="text-field"
                  size="sm"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
                <Form.Control
                  id="text-field"
                  size="sm"
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  {...register('dob')}
                  className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.dob?.message}</div>
                <Form.Control
                  id="text-field"
                  size="sm"
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register('password')}
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
                <Form.Control
                  id="text-field"
                  size="sm"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  {...register('confirmPassword')}
                  className={`form-control ${
                    errors.confirmPassword ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>

                <Button
                  type="submit"
                  id="btnn"
                  className={`btn btn-primary ${
                    isButtonLoading ? 'loading' : ''
                  }`}
                  disabled={isButtonLoading}
                >
                  Sign Up
                </Button>
              </Form>

              <p>
                If you have already sign in!{' '}
                <Link to={'/login'}>
                  <strong>Sign In</strong>
                </Link>
              </p>
            </div>
            <div className="col-md-4"></div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Registration;
