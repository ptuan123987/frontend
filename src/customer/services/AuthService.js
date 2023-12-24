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

const loginAdmin = (email, password) => {
  return axios
    .post(API_URL + "/api/admin/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      const { admin_token, refresh_token } = response.data.data;

      console.log(admin_token);
      console.log(refresh_token);
      localStorage.setItem("admin_token", admin_token);
      localStorage.setItem("refresh_token", refresh_token);
      return response;
    });
};

const getCurrentAccessToken = () => {
    return localStorage.getItem('access_token');
};

const profile = () => {
  const access_token = localStorage.getItem("access_token");

  return axios.get(API_URL + "api/user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};


const isUser = async () => {
  try {
    const response = await profile();
    const { role } = response.data;

    return role === 'user';
  } catch (error) {
    console.error("Error checking user status:", error);
    return false;
  }
};
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("admin_token");
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
const editProfile = (display_name, email) => {
  console.log(display_name, email);
  const access_token = localStorage.getItem("access_token");

  return axios
    .put(
      API_URL + "api/user/edit-profile",
      {
        display_name,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

const changePassword = (oldPassword, newPassword) => {
  const access_token = localStorage.getItem("access_token");
  return axios
    .post(
      API_URL + "api/user/change-password",
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

const isLoggedIn = () => {
  const access_token = localStorage.getItem("access_token");

  return !!access_token; 
};

const isAdmin = async () => {
  try {
    if (!isLoggedIn()) {
      return false; 
    }

    const response = await profile();
    const role = response.data.role;

    return role === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
const AuthService = {
  register,
  login,
  loginAdmin,
  profile,
  logout,
  forgotPassword,
  resetPassword,
  editProfile,
  changePassword,
  getCurrentAccessToken,
  isAdmin,
  isUser,
  isLoggedIn,

};

export default AuthService;
