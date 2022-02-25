import { unsecureAPI, secureAPI } from './API';

async function registration(authPayload) {
  return new Promise((resolve, reject) => {
    //unsecure means it has no Bearer token in header

    unsecureAPI()
      .post('/auth/register', authPayload)
      .then(({ data }) => {
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err); //get error message
      });
  });
}

async function login(authPayload) {
  return new Promise((resolve, reject) => {
    unsecureAPI()
      .post('/auth/login', authPayload)
      .then(({ data }) => {
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        console.log('sevice error', err);
        reject(err); //get error message
      });
  });
}

async function changePassword(passPayload) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .put('/auth/changePassword', passPayload)
      .then((data) => {
        if (data) {
          resolve(data);
          //do i need to store token and user_info
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function getMe(email) {
  return new Promise((resolve, reject) => {
    unsecureAPI()
      .get('/auth/profile/' + email)
      .then(({ data }) => {
        if (data) {
          resolve(data);
          //do i need to store token and user_info
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
////get all users
async function getAllUser() {
  return new Promise((resolve, reject) => {
    secureAPI()
      .get('/auth/friends/')
      .then(({ data }) => {
        console.log(data);
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

////follow
async function followUpdate(u_id, followPayload) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .patch(`/auth/friends/${u_id}`, followPayload)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
///Unfollow

async function unFollowUpdate(u_id, unfolllowpayload) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .patch(`/auth/friends/unfollow/${u_id}`, unfolllowpayload)
      .then(({ data }) => {
        if (data.success) {
          resolve(data.data); //return single object
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//Update Profile add/edit
async function updateProfile(bio_id, bioPayload) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .put(`/auth/profile/${bio_id}`, bioPayload)
      .then(({ data }) => {
        if (data.success) {
          resolve(data.data); //return single object
        }
      })
      .catch((err) => {
        reject(err.response.data.error);
      });
  });
}

//get all userFriends following
async function getUserFriends(u_id) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .get(`./auth/friends/list/${u_id}`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//get all user Follower
async function getUserFollower(u_id) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .get(`./auth/friends/follower/${u_id}`)
      .then(({ data }) => {
        console.log(data);
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export {
  registration,
  login,
  changePassword,
  getMe,
  updateProfile,
  getAllUser,
  followUpdate,
  unFollowUpdate,
  getUserFriends,
  getUserFollower,
};
