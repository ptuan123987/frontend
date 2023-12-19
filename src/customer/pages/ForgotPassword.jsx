import { React, useState } from "react";
import Layout from "../components/Layout";
import Input1 from "../components/forms/Input1";
import Button3 from "../components/buttons/Button3";
import SuccessModal from "../components/modal/SuccessModal";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const ForgotPassword = () => {
  const location = useLocation();
  const appName = "Udemy";
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleSubmit = () => {
    AuthService.forgotPassword(email).then((response) => {
      console.log(response);
      setShowSuccessModal(true);
    });
  };
  function moveToLogin() {
    navigate("/login");
  }

  return (
    <Layout>
      <section className="my-10 max-w-xs mx-auto">
        <h2 className=" text-center m-5">Forgot Password</h2>
        <form className="flex flex-col gap-2">
          <Input1
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <Button3 className="mt-2" type="submit" onClick={handleSubmit}>
            Send Email
          </Button3>
        </form>

        {showSuccessModal && (
          <SuccessModal onClick={() => setShowSuccessModal(false)}>
            <div className="">
              <h2>Success!</h2>
              <p>Email sent successfully.</p>
            </div>
          </SuccessModal>
        )}
      </section>
      <p className="text-center text-md mb-20">
        Already have an account?{" "}
        <button
          onClick={moveToLogin}
          className="underline text-violet-700 font-UdemySansBold"
        >
          Login
        </button>
      </p>
    </Layout>
  );
};

export default ForgotPassword;
