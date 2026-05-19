// api.js
import axios from "axios";
export const BASE_URL = "jwtprojectwithvscode-production.up.railway.app";
const api = axios.create({
  baseURL: "jwtprojectwithvscode-production.up.railway.app"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export default api;
