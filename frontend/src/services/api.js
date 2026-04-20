import axios from "axios";
import { emitUnauthorized } from "../utils/authEvents";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      emitUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
