import axios from 'axios';
function secureAPI() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
function unsecureAPI() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { 'Content-Type': 'application/json' },
  });
}
function unsecureDownloadAPI() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { 'Content-Type': 'application/json' },
    responseType: 'blob', //important, must be type blob to succefully reassable.
  });
}
function secureDownloadAPI() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    responseType: 'blob',
  });
}
//this function used for retrn response
function responseAPI(apiPath, body) {
  return new Promise((resolve, reject) => {
    secureAPI()
      .put(`${apiPath}`, body)
      .then(({ data }) => {
        if (data.success) {
          resolve(data.data); //return array
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err.response.data.error);
      });
  });
}
export {
  secureAPI,
  unsecureAPI,
  responseAPI,
  secureDownloadAPI,
  unsecureDownloadAPI,
};
