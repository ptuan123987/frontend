import { React, useEffect, useState } from "react";
import Input1 from "../../customer/components/forms/Input1";
import Button3 from "../../customer/components/buttons/Button3";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../../customer/components/forms/PasswordInput";
import AuthService from "../../customer/services/AuthService";
import SuccessModal from "../../customer/components/modal/SuccessModal";
const AdminLogin = () => {
  const location = useLocation();
  const appName = "Udemy";
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");
  const [errorMessage, setErrorMessage] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await AuthService.login(email, password);
  
      const res = await AuthService.profile();
      const userRole = res.data.role;
  
      if (userRole === "admin") {
        setShowSuccessModal(true);
  
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        window.location.reload();
      }
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
  
      setErrorMessage(resMessage);
      console.error("Error during login:", error);
    }
  };

  return (
    <section className="my-10 max-w-xs mx-auto ">
      <h1 className="text-base font-UdemySansBold mb-3 text-center">
        Log in to admin {appName} account
      </h1>
      <div className="flex flex-col gap-2">
        {/* Form for email and password */}
        <form className="flex flex-col gap-2">
          <Input1
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Display error message if it exists */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {showSuccessModal && (
            <SuccessModal onClick={() => setShowSuccessModal(false)}>
              <h2>Success!</h2>
              <p>Login successfully.</p>
            </SuccessModal>
          )}
          <Button3 className="mt-2" type="submit" onClick={handleSubmit}>
            Login
          </Button3>
        </form>

        <hr />
      </div>
    </section>
  );
};

export default AdminLogin;
