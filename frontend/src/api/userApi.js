import axios from "axios";

// all the api calls

const API_BASE_URL = "/api/v1/users"; // base URL for user-related API calls

export function registerUser(username, email, password) {
  return axios
    .post(`${API_BASE_URL}/register`, {
        username,
        email,
        password,
    })
}

export function loginUser(email, password) {
  return axios
  .post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
}

export function logoutUser(email) {
  return axios.post(`${API_BASE_URL}/logout`, {
    email,
  });
}
