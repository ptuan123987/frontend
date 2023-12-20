import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./Profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import AuthService from "../../services/AuthService";
import SuccessModal from "../../components/modal/SuccessModal";
import Button3 from "../../components/buttons/Button3";

import PasswordInput from "../../components/forms/PasswordInput";

const ChangePassword = () => {
  const location = useLocation();
  const appName = "Udemy";
  const navigate = useNavigate();

  const { userData, setUserData } = useUserStore();
  const initials = useUserStore((state) => state.getInitials());
  const [oldPassword, setOldPassword] = useState(
    location.state?.password || ""
  );

  const [newPassword, setNewPassword] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function moveToChangePassword() {
    navigate("/change-password");
  }
  function moveToProfile() {
    navigate("/profile");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    AuthService.changePassword(oldPassword, newPassword).then(
      (response) => {
        console.log(response);
        setShowSuccessModal(true);

        setTimeout(() => {
            navigate("/profile");
        }, 1500);

      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrorMessage(resMessage);
      }
    );
  };

  return (
    <Layout>
      <div className="container flex m-auto h-[500px]">
        <aside className="sidebar w-1/4">
          <div className="profile-summary text-center p-4">
            <div className="avatar inline-block w-24 h-24 rounded-full bg-gray-300 text-white text-2xl flex items-center justify-center">
              {initials}
            </div>
            <div>{userData?.display_name}</div>
            <div>{userData?.email}</div>
          </div>
          <nav className="profile-navigation">
            <ul className="text-sm">
              <li className="py-2 px-4 hover:bg-gray-200">
                <a
                  href=""
                  onClick={moveToProfile}
                  className="block w-full h-full"
                >
                  Profile
                </a>
              </li>
              <li className="py-2 px-4 hover:bg-gray-200">
                <a
                  href=""
                  onClick={moveToChangePassword}
                  className="block w-full h-full"
                >
                  Change Password
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <section className="my-10 max-w-xs mx-auto">
          <div className="flex flex-col gap-4">
            <form className="flex flex-col gap-4">
              <PasswordInput
                label="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button3 className="mt-2" type="submit" onClick={handleSubmit}>
                Save
              </Button3>
            </form>

            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}

            {showSuccessModal && (
              <SuccessModal onClick={() => setShowSuccessModal(false)}>
                <h2>Success!</h2>
                <p>Password updated successfully.</p>
              </SuccessModal>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ChangePassword;
