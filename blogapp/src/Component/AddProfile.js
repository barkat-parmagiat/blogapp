import React, { useState, useEffect } from 'react';
import InnerHeader from '../common/InnerHeader';
import {
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button,
  Dropdown,
  ButtonGroup,
  Container,
} from 'react-bootstrap';
import { getMe, updateProfile } from '../services/authservice';
import { Link, useNavigate, Redirect, Navigate } from 'react-router-dom';
import { showAlert } from './../util/alertModal';
import moment from 'moment';

const AddProfile = () => {
  const id = localStorage.getItem('_id');
  const email = localStorage.getItem('email');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState();
  // let currentDate = moment().format('DD-MM-YYYY');
  const [dateBirth, setDateBirth] = useState();

  const populateFieldWithData = async () => {
    try {
      let profile_data = await getMe(email);

      setDateBirth(moment(profile_data?.data?.dob).format('YYYY-MM-DD'));
      setProfileData(profile_data.data);
    } catch (err) {}
  };
  useEffect(() => {
    populateFieldWithData();
  }, []);

  //for Update
  const updateEvent = async (ev) => {
    ev.preventDefault();
    setIsButtonLoading(true);
    let updatePayload = {
      fullname: ev.target.fullname.value,
      bio: ev.target.bio.value,
      dob: ev.target.dob.value,
      phone: ev.target.phone.value,
      country: ev.target.country.value,
      city: ev.target.city.value,
      hometown: ev.target.hometown.value,
    };
    try {
      setIsButtonLoading(false);
      let update_res = await updateProfile(id, updatePayload);
      if (update_res) {
        setIsButtonLoading(false);
        setProfileData(update_res.data);
        showAlert('Updated', false);
        navigate('/profile');
      }
    } catch (err) {
      setIsButtonLoading(false);
      showAlert('err', true);
    }
  };
  return (
    <>
      <InnerHeader />
      <Container>
        <h1>Edit Profile</h1>
        <Form onSubmit={updateEvent}>
          <div className="m-2">
            <Row>
              <Col className="pt-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  defaultValue={profileData?.fullname}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="pt-2">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  type="text"
                  name="bio"
                  defaultValue={profileData?.bio}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="pt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profileData?.email}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="pt-2">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={dateBirth}
                  onChange={(ev) => {
                    setDateBirth(ev.target.value);
                  }}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="pt-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  defaultValue={profileData?.phone}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col className="pt-2">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  defaultValue={profileData?.country}
                ></Form.Control>
              </Col>
              <Col className="pt-2">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  defaultValue={profileData?.city}
                ></Form.Control>
              </Col>
              <Col className="pt-2">
                <Form.Label>Home Town</Form.Label>
                <Form.Control
                  type="text"
                  name="hometown"
                  defaultValue={profileData?.hometown}
                ></Form.Control>
              </Col>
            </Row>
          </div>
          <Button
            type="submit"
            className={`btn btn-primary ${isButtonLoading ? 'loading' : ''}`}
            disabled={isButtonLoading}
          >
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddProfile;
