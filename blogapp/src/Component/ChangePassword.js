import React, { useState } from 'react';
//for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
import InnerHeader from '../common/InnerHeader';
import { changePassword } from '../services/authservice';
import { showAlert } from './../util/alertModal';

function ChangePassword() {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const ChangePasswordValidationSchema = Yup.object().shape({
    current_password: Yup.string().required('Password is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordValidationSchema),
  });

  const ChangePasswordEvent = async (data) => {
    console.log(data);
    let passPayload = {
      current_password: data.current_password,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    /*     try {
      setIsButtonLoading(false);
      alert('Your Password has Changed');

      navigate(`/timeline`);
    } catch (err) {
      setIsButtonLoading(false);
    } */
    if (data.password !== data.current_password) {
      try {
        console.log('updateInformation');
        let updateInformation = await changePassword(passPayload);

        setIsButtonLoading(false);
        showAlert('Password has been succesfully updated');
        navigate(`/login`);
      } catch (err) {
        console.log('Error', err);
        setIsButtonLoading(false);
        showAlert('Something wrong happend !', true);
      }
    } else {
      setIsButtonLoading(false);
      showAlert("Confirm password doesn't match", true);
    }
  };
  return (
    <>
      {/* <InnerHeader /> */}
      <Container>
        <div className="row">
          {/*  <div className="col-md-4"></div> */}
          <div className="col-md-10 signup-form">
            <h3>Change Password</h3>
            <Form onSubmit={handleSubmit(ChangePasswordEvent)}>
              <Form.Control
                id="text-field"
                size="sm"
                type="password"
                name="current_password"
                placeholder="current password"
                {...register('current_password')}
                className={`form-control ${
                  errors.current_password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.current_password?.message}
              </div>
              <Form.Control
                id="text-field"
                size="sm"
                type="password"
                name="password"
                placeholder="New Password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
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
                Submit
              </Button>
            </Form>
          </div>
          {/*  <div className="col-md-4"></div> */}
        </div>
      </Container>
    </>
  );
}

export default ChangePassword;
