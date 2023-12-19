import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Input1 from "../components/forms/Input1";
import Button3 from "../components/buttons/Button3";
import SuccessModal from "../components/modal/SuccessModal";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import PasswordInput from "../components/forms/PasswordInput";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState(location.state?.email || "");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const tokenFromURL = searchParams.get("token");

    setToken(tokenFromURL);
  }, [searchParams]);

  const handleSubmit = () => {
    console.log(email,password,token);
    AuthService.resetPassword(email, token, password).then((response) => {
      console.log(response);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/login", {
            state: { email: email, password: password },
          });
      }, 3000);
    });
  };

  return (
    <Layout>
      <section className="my-10 max-w-xs mx-auto">
        <h2 className="text-center m-5">Reset Password</h2>
        <form className="flex flex-col gap-2">
          {/* Input để hiển thị giá trị của 'token' */}
          {/* <Input1 label="Token" value={token} onChange={(e) => setToken(e.target.value)}/> */}

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

          <Button3 className="mt-2" type="submit" onClick={handleSubmit}>
            Reset Password
          </Button3>
        </form>

        {showSuccessModal && (
          <SuccessModal onClick={() => setShowSuccessModal(false)}>
            <h2>Success!</h2>
            <p>Password reset successfully.</p>
          </SuccessModal>
        )}
      </section>
    </Layout>
  );
};

export default ResetPassword;
