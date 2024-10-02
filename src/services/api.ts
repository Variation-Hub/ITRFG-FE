import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";

// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create();

// Add request interceptor to include the Authorization header with the token
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 and 403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const response = await axios.post("your-refresh-token-api-endpoint", {
          refreshToken: refreshToken,
        });

        const tokenData = response.data.data;

        localStorage.setItem("accessToken", tokenData?.accessToken);
        localStorage.setItem("refreshToken", tokenData?.refreshToken);

        const originalRequest =
          error.config || ({} as InternalAxiosRequestConfig);
        originalRequest.headers =
          originalRequest?.headers || ({} as AxiosRequestHeaders);
        originalRequest.headers.Authorization = `Bearer ${tokenData?.accessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
