import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new err("Missing VITE_API_BASE_URL in environment variable");
}

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    if (
      err.response &&
      err.response.status === 401 &&
      localStorage.getItem("token")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(new Error("Session expired. Please login again"));
    }

    const message =
      err.response?.data?.error?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

export default api;
