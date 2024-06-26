import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import Input1 from '../../components/forms/Input1';
import Button3 from '../../components/buttons/Button3';
import Button1 from '../../components/buttons/Button1';
import AuthService from '../../services/AuthService';
import PasswordInput from '../../components/forms/PasswordInput';
import { API_URL } from '../../../Constants';
import SuccessModal from '../../components/modal/SuccessModal';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appName = 'Udemy';

  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState(location.state?.password || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const moveToSignup = () => {
    navigate('/signup');
  };

  const moveToForgot = () => {
    navigate('/forgot-password');
  };

  const redirectToGoogleLogin = async () => {
    try {
      const response = await axios.get(`${API_URL}api/login/google`, {
        params: { redirect_url: API_URL+ 'callback/google' },
      });
      window.location.href = response.data.login_url;
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToGithubLogin = async () => {
    try {
      const response = await axios.get(`${API_URL}api/login/github`, {
        params: { redirect_url: API_URL+ 'callback/github' },
      });
      window.location.href = response.data.login_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await AuthService.login(email, password);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      const resMessage = error.response?.data?.message || error.message || error.toString();
      setErrorMessage(resMessage);
      console.log(resMessage);
    }
  };

  return (
    <Layout>
      <section className="my-10 max-w-xs mx-auto">
        <h1 className="text-base font-UdemySansBold mb-3 text-center">
          Log in to your {appName} account
        </h1>
        <div className="flex flex-col gap-2">
          {/* Google */}
          <Button1 className="w-full !font-black !text-black !text-base !mb-0">
            <div onClick={redirectToGoogleLogin} className="flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6"></svg>
              <span className="font-UdemySansBold"> Continue with Google</span>
            </div>
          </Button1>

          {/* Github */}
          <Button1 className="w-full !font-black !text-black !text-base !mb-0">
            <div onClick={redirectToGithubLogin} className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8"></svg>
              <span className="font-UdemySansBold"> Continue with Github</span>
            </div>
          </Button1>

          {/* Form for email and password */}
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
              Login
            </Button3>
          </form>
          
          {/* Display error message if it exists */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          {showSuccessModal && (
            <SuccessModal setOpenModal={setShowSuccessModal}>
              <h2>Success!</h2>
              <p>Login successfully.</p>
            </SuccessModal>
          )}
          <hr />
          <p className="text-center">
            Don't have an account?
            <button
              onClick={moveToSignup}
              className="underline text-violet-700 font-UdemySansBold"
            >
              Sign up
            </button>
          </p>
          <p className="text-center">
            or
            <button
              to="#"
              className="underline text-violet-700 font-UdemySansBold"
              onClick={moveToForgot}
            >
              Forgot Password
            </button>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
