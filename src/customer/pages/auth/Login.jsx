import {React,useState} from "react";
import Layout from "../../components/Layout";
import Input1 from "../../components/forms/Input1";
import Button3 from "../../components/buttons/Button3";
import Button1 from "../../components/buttons/Button1";
import {useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import AuthService from "../../services/AuthService";
import PasswordInput from "../../components/forms/PasswordInput";
const Login = () => {
  const location = useLocation();
  const appName = "Udemy";
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState(location.state?.password || "");
  
  function moveToSignup() {
    navigate("/signup");
  }
  function moveToForgot() {
    navigate("/forgot-password");
  }
  
  async function redirectToGoogleLogin() {

    const response = await axios.get("http://localhost:8000/api/login/google", {
      params: {
        redirect_url: "http://localhost:3000/callback/google",
      },
    });
    console.log(response);

    window.location.href = response.data.login_url;
  }

  async function redirectToGithubLogin() {
    const response = await axios.get("http://localhost:8000/api/login/github", {
      params: {
        redirect_url: "http://localhost:3000/callback/github",
      },
    });
    console.log(response);
    
    window.location.href = response.data.login_url;
  }

  const handleSubmit = (event) => {
    AuthService.login(email, password).then( async () => {
      console.log("Logged In Successfully !");
      navigate("/");
    })
  }

  return (
    <Layout>
      <section className="my-10 max-w-xs mx-auto">
        <h1 className="text-base font-UdemySansBold mb-3 text-center">
          Log in to your {appName} account
        </h1>
        <div className="flex flex-col gap-2">
          {/* Google */}
          <Button1 className="w-full !font-black !text-black !text-base !mb-0">
            <div
              onClick={redirectToGoogleLogin}
              className="flex items-center gap-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-6 h-6"
              ></svg>
              <span className="font-UdemySansBold"> Continue with Google</span>
            </div>
          </Button1>

          {/* Github */}
          <Button1 className="w-full !font-black !text-black !text-base !mb-0">
            <div
              onClick={redirectToGithubLogin}
              className="flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-8 h-8"
              ></svg>
              <span className="font-UdemySansBold"> Continue with Github</span>
            </div>
          </Button1>

          {/* Form for email and password */}
          <form className="flex flex-col gap-2" >
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
            <Button3 className="mt-2" type="submit"  onClick={handleSubmit}>Login</Button3>
          </form>

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
