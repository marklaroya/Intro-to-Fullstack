import axios from "axios";

// all the api calls

const API = axios.create({
  baseURL: "/api/v1/posts", // base URL for user-related API calls
});

export function createPost(name, description, age) {
  return API
    .post(`/create`, {
        name,
        description,
        age,
    });
}

export function getPosts() {
  return API.get(`/getPosts`);
}

export function updatePost(id, data) {
  return API.patch(`/update/${id}`, data);
}

export function deletePost(id) {
  return API.delete(`/delete/${id}`);
}