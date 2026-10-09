import { popup } from "@/components/PopupManager";
import { useOtpStore } from "@/store/player/useOtpStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const token = authData?.state?.token;
      const { resetToken } = useOtpStore.getState();

      if (resetToken) {
        config.headers.Authorization = `Bearer ${resetToken}`;
      } else if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }
    } catch (err) {
      console.error("Failed to parse auth storage:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorData = error.response?.data?.error;
    if (status === 401) {
      if (window.location.pathname !== "/auth/login") {
        localStorage.removeItem("auth-storage");
        window.location.assign("/auth/login");
      }
      popup.error("Unauthorized Request!");
    }

    if (errorData) {
      return Promise.reject(errorData);
    }

    return Promise.reject(error);
  }
);
