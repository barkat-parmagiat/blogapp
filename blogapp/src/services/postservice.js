import { unsecureAPI, secureAPI } from './API';

async function post(postPayload) {
  return new Promise((resolve, reject) => {
    //unsecure means it has no Bearer token in header

    unsecureAPI()
      .post('/post/timeline', postPayload)
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

async function getPosts(userId) {
  return new Promise((resolve, reject) => {
    //unsecure means it has no Bearer token in header

    unsecureAPI()
      .get('/post/timeline/' + userId)
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

//get allpost of user and followe following post
async function getUserWithFriendsAllPost(userId) {
  return new Promise((resolve, reject) => {
    unsecureAPI()
      .get(`/post/timeline/relatedPost/${userId}`)
      .then(({ data }) => {
        if (data) {
          resolve(data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function postComment(commentPayload, post_id) {
  return new Promise((resolve, reject) => {
    //unsecure means it has no Bearer token in header

    unsecureAPI()
      .post(`post/timeline/${post_id}/comments`, commentPayload)
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

async function deletePost(post_id) {
  return new Promise((resolve, reject) => {
    //unsecure means it has no Bearer token in header

    unsecureAPI()
      .delete(`post/timeline/${post_id}`)
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

async function editPost(post_id, editpostPayload) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .patch(`/post/timeline/${post_id}`, editpostPayload)
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

export {
  post,
  getPosts,
  postComment,
  deletePost,
  editPost,
  getUserWithFriendsAllPost,
};
