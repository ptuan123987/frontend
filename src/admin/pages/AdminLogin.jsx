import React from "react";
import Input1 from "../../customer/components/forms/Input1";
import Button3 from "../../customer/components/buttons/Button3";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import AdminLayout from "../components/AdminLayout";
const AdminLogin = () => {
  const appName = "Udemy";
  const navigate = useNavigate();

  return (
      <section className="my-10 max-w-xs mx-auto ">
        <h1 className="text-base font-UdemySansBold mb-3 text-center">
          Log in to admin {appName} account
        </h1>
        <div className="flex flex-col gap-2">
          {/* Form for email and password */}
          <form className="flex flex-col gap-2">
            <Input1 label="Email" />
            <Input1 label="Password" />
            <Button3 className="mt-2" type="submit">Log In</Button3>
          </form>

          <hr />
        
          <p className="text-center">
            or
            <button
              to="#"
              className="underline text-violet-700 font-UdemySansBold"
            >
              Forgot Password
            </button>
          </p>
        </div>
      </section>
  );
};

export default AdminLogin;
