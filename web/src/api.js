import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function loginHandler(email, password) {
  return axios.post(baseUrl + '/users/login', 
    { 
      email, 
      password 
    }, 
    { 
      withCredentials: true,
    })
}


