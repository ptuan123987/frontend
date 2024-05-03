import axios from 'axios';
import { API_URL } from "../../Constants";
const api = axios.create({
  baseURL: API_URL + 'api/',
});

api.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem('access_token');
    const tokenExpiration = localStorage.getItem('token_expiration');
    const currentTime = Date.now() / 1000; 

    if (access_token && tokenExpiration && currentTime >= tokenExpiration - 60) {
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        const response = await api.post('user/refresh', {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        const newAccessToken = response.data.access_token;

        localStorage.setItem('access_token', newAccessToken);
        const newTokenExpiration = currentTime + 3600; 
        localStorage.setItem('token_expiration', newTokenExpiration);
      } catch (error) {
        throw error;
      }
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
