let SECURE_API_CONFIG = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};
let UNSECURE_API_CONFIG = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export { SECURE_API_CONFIG, UNSECURE_API_CONFIG };
