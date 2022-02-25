import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  NavDropdown,
  FormControl,
  Form,
  Nav,
  Button,
  Carousel,
  Table,
} from 'react-bootstrap';
import InnerHeader from '../common/InnerHeader';
import { getMe } from '../services/authservice';
import * as Icon from 'react-bootstrap-icons';
import moment from 'moment';
import ChangePassword from '../Component/ChangePassword';
import PersonalTimeline from '../Component/PersonalTimeline';
import avatar from '../assets/Images/avatar.jpg';

const Profile = () => {
  const fullname = localStorage.getItem('fullname');
  const [profileData, setProfileData] = useState();
  const getProfile = async () => {
    try {
      let email = localStorage.getItem('email');
      let profileRespose = await getMe(email);
      if (profileRespose) {
        setProfileData(profileRespose.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getProfile();
  }, []);
  console.log('profileData', profileData);
  return (
    <>
      <InnerHeader />
      <Container>
        <div className="row">
          <div className="col-md-8  mt-2">
            <div>
              <h3>{fullname}</h3>
            </div>
            <div className="mt-4 p-2 border-2">
              <h5>Profile pic</h5>
              <span className="aboutpic">
                <img src={avatar} alt="profile pic" />
              </span>
            </div>
            <div className="mt-2 p-2 border-2">
              <h5>Email</h5>
              <h6>{profileData?.email}</h6>
            </div>
            <div className="mt-2 p-2 border-2">
              <div className="editright">
                <Link to={`/profile/${profileData?._id}`}>
                  <Icon.PencilFill />
                </Link>
              </div>
              <h5>Bio</h5>
              <h6>{profileData?.bio}</h6>
            </div>
            <div>
              <PersonalTimeline />
            </div>
          </div>
          <div className="col-md-4  mt-2">
            <ChangePassword />
            <div className="flex">
              <div className="col-md-5">
                <p>
                  <b>Follower</b>
                </p>
                <p>{profileData?.follower?.length}</p>
              </div>
              <div className="col-md-5">
                <p>
                  <b>Following</b>
                </p>
                <p>{profileData?.following?.length}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;

/*  <Table striped bordered hover variant="light">
   <thead>
     <tr>
       <th>{profileData?.fullname}</th>
       <th></th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>Full Name</td>
       <td>{profileData?.fullname}</td>
     </tr>
     <tr>
       <td>Bio</td>
       <td>{profileData?.bio}</td>
     </tr>
     <tr>
       <td>Email</td>
       <td>{profileData?.email}</td>
     </tr>
     <tr>
       <td>Date of Birth</td>
       <td>{moment.utc(profileData?.dob).format('DD-MM-YYYY')}</td>
     </tr>
     <tr>
       <td>Phone</td>
       <td>{profileData?.phone}</td>
     </tr>
     <tr>
       <td>Country</td>
       <td>{profileData?.country}</td>
     </tr>
     <tr>
       <td>City</td>
       <td>{profileData?.city}</td>
     </tr>
     <tr>
       <td>Hometown</td>
       <td>{profileData?.hometown}</td>
     </tr>
   </tbody>
   <Link to="/profile/add" className="mx-2 mt-4">
     <Button>Edit Bio</Button>
   </Link>
 </Table>; */
