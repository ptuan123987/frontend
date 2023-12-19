import axios from "axios";
import { API_URL } from "../../Constants";

const register = (display_name, email, password) => {
  return axios
    .post(API_URL + "api/auth/register", {
      display_name,
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "api/auth/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      const { access_token, refresh_token } = response.data.data;

      console.log(access_token);
      console.log(refresh_token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return response;
    });
};

const profile = () => {
  const access_token = localStorage.getItem("access_token");

  return axios.get(API_URL + "api/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const forgotPassword = (email) => {
  return axios
    .post(API_URL + "api/auth/forgot-password", {
      email,
    })
    .then((response) => {
      console.log(response);
    });
};

const resetPassword = (email, resetToken, password) => {
  console.log(email, resetToken, password);
  return axios
    .post(API_URL + "api/auth/reset-password", {
      email,
      resetToken,
      password,
    })
    .then((response) => {
      console.log(response);
    });
};

const AuthService = {
  register,
  login,
  profile,
  logout,
  forgotPassword,
  resetPassword,
};

export default AuthService;
