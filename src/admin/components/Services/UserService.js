import { toast } from "react-toastify";
import { API_URL, access_token } from "../../../Constants";
import axios from "axios";


const fetchUsers = async () => {
    try {
        const response = await axios.get(
            API_URL + `api/users`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );
       return response.data.data;
    } catch (error) {
        console.error("Error fetch users", error.message);
        throw error;
    }
}

const addUser = async (user) => {
  const { displayName, email, password, role } = user;
  try {
    const response = await axios.post(
      API_URL + `api/users`,
      {
        display_name: displayName,
        email: email,
        password: password,
        role: role,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    toast.success('User is added');
    return response.data;
  } catch (error) {
    console.error("Error add user", error.message);
    toast.error('Failed to add user');
    throw error;
  }
}
const updateUser = async (userId, user) => {
    const { displayName, email, password, role } = user;
    try {
      const response = await axios.put(
        API_URL + `api/users/${userId}`,
        {
          display_name: displayName,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      toast.success('User is updated');
      return response.data;
    } catch (error) {
      console.error("Error updating user", error.message);
      toast.error('Failed to update user');
      throw error;
    }
};
const deleteUser =async (userId) => {
    try {
        const response = await axios.delete(
            API_URL + `api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
        );
        toast.success('User is deleted');
       return response.data;
    } catch (error) {
        console.error("Error fetch users", error.message);
        toast.error('User is deleted');
        throw error;
    }
}
const fetchSpecifiedUser = async (userId) => {
    try {
      const response = await axios.get(
          API_URL + `api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
      );
    return response.data.data;
  } catch (error) {
      console.error("Error fetch user", error.message);
      throw error;
  }
}


const UserService = {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    fetchSpecifiedUser
}
export default UserService;