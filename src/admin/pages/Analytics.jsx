import React from "react";
import AdminLayout from "../components/AdminLayout"
import MainDash from '../components/MainDash/MainDash';
import LoginRecords from "../components/Charts/LoginRecords";
import Revenue from '../components/Charts/Revenue';
const Analytics = () => {
    return (    
        <AdminLayout>
            <div className="">
                <LoginRecords/>
                <Revenue/>
            </div>
        </AdminLayout>
    )
}
export default Analytics;