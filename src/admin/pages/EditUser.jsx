import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import UserService from "../components/Services/UserService";
import { useNavigate } from "react-router-dom";
const EditUser = () => {
    const { userId } = useParams(); 
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const user = await UserService.fetchSpecifiedUser(userId);
          setDisplayName(user.display_name);
          setEmail(user.email);
          setRole(user.role);
        } catch (error) {
          console.error("Error fetching user", error.message);
        }
      };
  
      fetchUser();
    }, [userId]);
  
    const updateUser = async () => {
      const user = { displayName, email, password, role };
      try {
        const response = await UserService.updateUser(userId, user);
        console.log(response);
      } catch (error) {
        console.error("Error updating user", error.message);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      updateUser();
      navigate('/admin/students');
    };
    
    return (    
        <AdminLayout>
            <div className="w-8/12 m-auto ">     
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="grid-display-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Display Name
                            </label>
                            <input
                                id="grid-display-name"
                                type="text"
                                placeholder="Jane Doe"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label htmlFor="grid-email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Email
                            </label>
                            <input
                                id="grid-email"
                                type="email"
                                placeholder="jane@example.com"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label htmlFor="grid-password" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Password
                            </label>
                            <input
                                id="grid-password"
                                type="password"
                                placeholder="******************"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label htmlFor="grid-role" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Role
                            </label>
                            <select
                                id="grid-role"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>

);
}

export default EditUser;
