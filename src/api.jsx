// api.js
import axios from "axios";
export const BASE_URL = "https://jwtprojectwithvscode-production.up.railway.app/";
const api = axios.create({
  baseURL: "https://jwtprojectwithvscode-production.up.railway.app/"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export default api;