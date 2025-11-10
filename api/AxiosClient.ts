import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
});

// Request interceptor to attach token
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for errors
axiosClient.interceptors.response.use(
  res => res,
  err => {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        const status = err.response.status;
        const msg = err.response.data?.message || "Something went wrong";
        switch (status) {
          case 400:
          case 401:
            toast.error("Incorrect credentials or unauthorized.", { autoClose: 5000 });
            break;
          case 404:
            toast.error("API endpoint not found.", { autoClose: 5000 });
            break;
          case 500:
            toast.error("Server error, try again later.", { autoClose: 5000 });
            break;
          default:
            toast.error(msg, { autoClose: 5000 });
        }
      } else if (err.request) {
        toast.error("No response from server. Check your network.", { autoClose: 5000 });
      } else {
        toast.error(err.message, { autoClose: 5000 });
      }
    } else {
      toast.error("An unexpected error occurred.", { autoClose: 5000 });
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
