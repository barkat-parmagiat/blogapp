import React, { useState, useEffect } from 'react';

import { Container, Button, Table } from 'react-bootstrap';
import InnerHeader from '../common/InnerHeader';
import {
  getAllUser,
  followUpdate,
  unFollowUpdate,
  getUserFriends,
} from '../services/authservice';
import uava from '../assets/Images/uava.png';

const FriendsConnector = () => {
  /*   const [isButtonLoading, setIsButtonLoading] = useState(false); */
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  //get all friends

  const getUsers = async () => {
    try {
      let all_user = await getAllUser();
      console.log(all_user);
      if (all_user) {
        setUsers(all_user.data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    getUsers();
    getUserfollowing();
  }, []);

  //follow
  const follow = async (followerId, index) => {
    try {
      let userid = localStorage.getItem('_id');
      console.log(userid);
      let payload = {
        followerId: followerId,
      };
      await followUpdate(userid, payload);
      /*  let tempusers = users.filter((user) => user?._id !== followerId); */
      setFriends([...friends, followerId]);
      console.log(followerId);
    } catch (err) {}
  };
  //UnFolow
  const unFollow = async (f_id) => {
    console.log('i hit');
    try {
      let userid = localStorage.getItem('_id');
      console.log(userid);
      let payload = {
        followerId: f_id,
      };
      let unfollow_res = await unFollowUpdate(userid, payload);
      let friendTemp = friends.filter((friend) => friend !== f_id);
      setFriends([...friendTemp]);
      console.log('uu', unfollow_res);
    } catch (err) {
      console.log(err);
    }
  };
  //FriendsList
  const getUserfollowing = async () => {
    try {
      let user_id = localStorage.getItem('_id');
      let all_Friends = await getUserFriends(user_id);
      console.log('hllo', all_Friends);
      let friendsListTemp = all_Friends.data.following.map(
        (friend) => friend.user_id
      );
      setFriends(friendsListTemp);
    } catch (err) {}
  };

  return (
    <>
      <InnerHeader />
      <Container>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 flex">
            <Table>
              <thead>
                <th>Friends</th>
              </thead>
              <tbody>
                {users &&
                  users.map((user, index) => (
                    <tr>
                      <td>
                        <span className="pfl_pic">
                          <img src={uava} alt="user pic" />
                        </span>
                        {user?.fullname}
                      </td>
                      <td>
                        <Button
                          variant="default"
                          type="submit"
                          className="mt-4 w-100 hover:border-gray-400"
                          onClick={(ev) => {
                            friends.includes(user?._id)
                              ? unFollow(user?._id)
                              : follow(user?._id, index);
                          }}
                        >
                          {friends.includes(user?._id) ? 'Unfollow' : 'follow'}
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Container>
    </>
  );
};

export default FriendsConnector;
