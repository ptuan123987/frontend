import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./Profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import AuthService from "../../services/AuthService";
import SuccessModal from "../../components/modal/SuccessModal";
import Button3 from "../../components/buttons/Button3";

const Profile = () => {
  const location = useLocation();
  const appName = "Udemy";
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();
  const initials = useUserStore((state) => state.getInitials());

  const [userEmail, setUserEmail] = useState(
    userData?.email || ""
  );

  const [displayName, setDisplayName] = useState(userData?.display_name || "");
  console.log(displayName);

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
    

    AuthService.editProfile(displayName, userEmail).then(
      (response) => {
        console.log(response);
        setShowSuccessModal(true);

        setTimeout(() => {
            window.location.reload(); 
        }, 3000);

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
      <div className="container flex m-auto">
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

        <main className="profile-content w-3/4 p-4">
          <h1 className="text-2xl mb-2 text-center font-bold">
            Public profile
          </h1>
          <p className="mb-4 text-center">Add information about yourself</p>
          <hr />
          <br />
          <form>
            <div className="form-group mb-4">
              <label htmlFor="firstName" className="block mb-1">
                FullName
              </label>
              <input type="text" id="FullName" className="w-full border p-2" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="lastName" className="block mb-1">
                Email
              </label>
              <input type="email" id="Email" className="w-full border p-2"
               value={userEmail}
               onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="bio" className="block mb-1">
                Headline
              </label>
              <textarea id="bio" className="w-full border p-2"></textarea>
              <p className="text-xs text-gray-700">
                Add a professional headline like, "Instructor at Udemy" or
                "Architect."
              </p>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="language" className="block mb-2 font-bold">
                Language
              </label>
              <select id="language" className="w-full border p-2">
                <option>English (US)</option>
                <option>French</option>
                <option>Korean</option>
                <option>Japanese</option>
               
              </select>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}

            {showSuccessModal && (
              <SuccessModal onClick={() => setShowSuccessModal(false)}>
                <h2>Success!</h2>
                <p>Profile updated successfully.</p>
              </SuccessModal>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-800 text-white p-2 font-bold px-5 py-3"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
