import React from "react";
import AdminLayout from "../components/AdminLayout"
import MainDash from '../components/MainDash/MainDash';
import Table from '../components/Table/Table'
import UserTable from "../components/Table/UserTable";
import { useNavigate } from "react-router-dom";
const Students = () => {
    const negative = useNavigate();

    const negativeAddUser= async () => {
        negative("/admin/add-user")
    }
    return (    
        <AdminLayout>
            <div className="">     
                <div className="flex items-center justify-end mt-10 ">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={negativeAddUser}
                    >   
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                        </svg>

                    </button>
                </div>
                <UserTable/>
            </div>
        </AdminLayout>
    )
}
export default Students;