import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import UserService from "../Services/UserService"; 
import { useNavigate } from "react-router-dom";
const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const users = await UserService.fetchUsers();
      setUserData(users);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching users", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      const updatedUsers = userData.filter(user => user.id !== userId);
      setUserData(updatedUsers);
    } catch (error) {
      console.error("Error deleting user", error.message);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const columns = [
    {
      name: "display_name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email", 
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "role", 
      label: "Role",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "created_at",
      label: "Created At",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          const createdAt = new Date(value);
          return createdAt.toLocaleDateString('en-GB');
        },
      },
    },
    {
      name: "updated_at", 
      label: "Updated At",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          const updatedAt = new Date(value);
          return updatedAt.toLocaleDateString('en-GB');
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const userId = userData[tableMeta.rowIndex].id;
          return (
            <div>
              <button onClick={() => handleEditUser(userId)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
              </button>
              <button onClick={() => handleDeleteUser(userId)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          );
        },
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
  };

  return (
    <div className="mt-10">
      <MUIDataTable
        title={"Students"}
        data={userData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default UserTable;
