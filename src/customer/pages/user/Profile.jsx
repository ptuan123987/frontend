import React from 'react';
import Layout from "../../components/Layout";
import './Profile.css';

const Profile = () => {
    return (
        <Layout>
            <div className="container flex m-auto">
                <aside className="sidebar w-1/4">
                    <div className="profile-summary text-center p-4">
                        <div className="avatar inline-block w-24 h-24 rounded-full bg-gray-300 text-white text-2xl flex items-center justify-center">TH</div>
                        <h3 className="mt-2 font-boldchi">Trung Hoang</h3>
                        {/* <button className="mt-2 text-sm text-blue-500">View public profile</button> */}
                    </div>
                    <nav className="profile-navigation">
                        <ul className="text-sm">
                            <li className="py-2 px-4 hover:bg-gray-200">Profile</li>
                            <li className="py-2 px-4 hover:bg-gray-200">Photo</li>
                        </ul>
                    </nav>
                </aside>
                <main className="profile-content w-3/4 p-4">
                    <h1 className="text-2xl mb-2 text-center font-bold">Public profile</h1>
                    <p className="mb-4 text-center">Add information about yourself</p>
                    <hr />
                    <br />
                    <form>
                        <div className="form-group mb-4">
                            <label htmlFor="firstName" className="block mb-1">First Name</label>
                            <input type="text" id="firstName" className="w-full border p-2" />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="lastName" className="block mb-1">Last Name</label>
                            <input type="text" id="lastName" className="w-full border p-2" />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="bio" className="block mb-1">Headline</label>
                            <textarea id="bio" className="w-full border p-2"></textarea>
                            <p className='text-xs text-gray-700'>Add a professional headline like, "Instructor at Udemy" or "Architect."
                            </p>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="language" className="block mb-2 font-bold">Language</label>
                            <select id="language" className="w-full border p-2">
                                <option>English (US)</option>
                                <option>French</option>
                                <option>Korean</option>
                                <option>Japanese</option>
                                {/* ... other options */}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-gray-800 text-white p-2 font-bold px-5 py-3">Save</button>
                        </div>
                    </form>
                </main>
            </div>
        </Layout>
    );
};

export default Profile;