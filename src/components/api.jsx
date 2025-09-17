import axios from "axios";

const api = axios.create({
  baseURL: "https://devsite.digitalpractice.net/devsite/wp-json",
});

// ✅ Request interceptor - har request me access token bhejega
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor - agar 401 mila to refresh token call karega
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // agar 401 mila aur retry nahi hua hai
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        // refresh token se naya access token le aao
        const res = await axios.post(
          "https://devsite.digitalpractice.net/devsite/wp-json/custom-jwt/v1/refresh",
          { refresh_token: refreshToken }
        );

        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);

        // naya token headers me daal kar dobara original request bhej do
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token expired or invalid", refreshError);
        // Yaha user ko logout kara sakte ho
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
