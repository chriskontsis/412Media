import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:3005",
  withCredentials: true,
});
