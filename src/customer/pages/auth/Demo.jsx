import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../../components/buttons/Button1";
import Button3 from "../../components/buttons/Button3";
import Layout from "../../components/Layout";
import Input1 from "../../components/forms/Input1";
import { debounce } from "lodash";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const passwordStrengthContainer = useRef(null);
  const [debouncedPassword, setDebouncedPassword] = useState("");
  function moveToLogin() {
    navigate("/login");
  }

  const StrengthChecker = (password) => {
    const passwordStrengthNodeList =
      passwordStrengthContainer.current?.childNodes;
    const strengthMessageContainer = passwordStrengthNodeList[4];

    const analyzeRegex = {
      length: password.length >= 8, // Check if the length is at least 8 characters
      hasNumber: /\d/.test(password), // Check if there is at least one digit
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password), // Check for special characters
    };

    const strengthMessages = [
      "Too weak",
      "Could be Stronger",
      "Strong password",
      "Very strong password",
    ];

    const strengthColors = [
      "bg-red-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
    ];

    strengthMessageContainer.innerHTML = strengthMessages[0];
    passwordStrengthNodeList.forEach((node, index) => {
      node.classList.remove(strengthColors[index]);
    });

    let strengthLevel = 0;

    if (analyzeRegex.length) {
      strengthLevel = Math.min(Math.floor(password.length / 2), 3);
    }

    if (analyzeRegex.hasNumber) {
      strengthLevel = Math.min(strengthLevel + 1, 3);
    }

    if (analyzeRegex.hasSpecialChar) {
      strengthLevel = Math.min(strengthLevel + 1, 3);
    }

    strengthMessageContainer.innerHTML = strengthMessages[strengthLevel];
    passwordStrengthNodeList.forEach((node, index) => {
      if (index <= strengthLevel) {
        node.classList.add(strengthColors[index]);
      }
    });
  };

  const handlePasswordChange = debounce((value) => {
    setForm({ ...form, password: value });
    StrengthChecker(value);
  }, 300);

  const handleSignup = () => {
    console.log("Form submitted:", form);
  };

  return (
    <Layout>
      <section className="my-10 max-w-[21rem] mx-auto">
        <h1 className="text-base font-UdemySansBold mb-3">
          Sign up and start learning
        </h1>
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-2" onSubmit={handleSignup}>
            {/* Replace Input1 with your actual Input component */}
            <Input1
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              required
            />

            <Input1
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text"
              required
            />

            {form.errors && form.errors.email && (
              <div className="text-red-600">{form.errors.email}</div>
            )}
            <Input1
              label="Password"
              value={form.password}
              type={showPassword ? "text" : "password"}
              required
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                handlePasswordChange(e.target.value);
              }}
            ></Input1>
             <button
              type="button"
              className="absolute inset-y-4 right-4"
              onClick={() => setShowPassword(!showPassword)}
              disabled={form.processing}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="absolute inset-y-4 right-4"
              onClick={() => setShowPassword(!showPassword)}
              disabled={form.processing}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </button>
            <div
              className="flex items-center gap-1 my-2"
              ref={passwordStrengthContainer}
            >
              <div className="rounded bg-gray-300 h-1 w-12"></div>
              <div className="rounded bg-gray-300 h-1 w-12"></div>
              <div className="rounded bg-gray-300 h-1 w-12"></div>
              <div className="rounded bg-gray-300 h-1 w-12"></div>
              <span className="text-xs ms-1 text-neutral-500"></span>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                value=""
                className="w-4 h-4 text-black bg-gray-100 border-2 border-black focus:ring-0"
              />
              <label
                htmlFor="red-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Send me special offers, personalized recommendations, and
                learning tips
              </label>
            </div>
            <Button3 className="mt-2" type="submit">
              Sign up
            </Button3>
          </form>
          <p className="text-xs">
            By signing up, you agree to our{" "}
            <button to="#" className="underline">
              terms of use
            </button>{" "}
            and{" "}
            <button to="#" className="underline">
              privacy policy
            </button>
          </p>
          <hr />
          <p className="text-center text-sm">
            Already have an account?{" "}
            <button
              onClick={moveToLogin}
              className="underline text-violet-700 font-UdemySansBold"
            >
              Login
            </button>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
