import axios from "axios";

const api = axios.create({
  baseURL: "https://devsite.digitalpractice.net/devsite/wp-json",
  // baseURL: "https://portal.digitalpractice.net/hrm/wp-json",

});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - har request me access token bhejega
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authtoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // refresh already running → queue me daal do
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshtoken");
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(
          "https://devsite.digitalpractice.net/devsite/wp-json/custom-jwt/v1/refresh",
          // "https://portal.digitalpractice.net/hrm/wp-json/custom-jwt/v1/refresh",

          { refresh_token: refreshToken }
        );

        const newAccessToken = res.data.access_token;
        localStorage.setItem("authtoken", newAccessToken);

        api.defaults.headers.common["Authorization"] = "Bearer " + newAccessToken;
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
