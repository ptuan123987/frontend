import React from 'react';
import Layout from "../../components/Layout";
import './Profile.css';

const Photo = () => {
    return (
        <Layout>
            <div className="container flex m-auto">
                <aside className="sidebar w-1/4">
                    <div className="profile-summary text-center p-4">
                        <div className="avatar inline-block w-24 h-24 rounded-full bg-gray-300 text-white text-2xl flex items-center justify-center">TH</div>
                        <h3 className="mt-2 font-bold ">Trung Hoang</h3>
                        {/* <button className="mt-2 text-sm text-blue-500">View public profile</button> */}
                    </div>
                    <nav className="profile-navigation">
                        <ul className="text-sm">
                            <li className="py-2 px-4 bg-gray-300">Profile</li>
                            <li className="py-2 px-4 hover:bg-gray-200">Photo</li>
                        </ul>
                    </nav>
                </aside>
                <main className="profile-content w-3/4 p-4">
                    <h1 className="text-2xl mb-2 text-center font-bold">Photo</h1>
                    <p className="mb-4 text-center">Add a nice photo of yourself for your profile.</p>
                    <hr />
                    <br />
                    <div className="border p-4 flex justify-center items-center">
                        <span className="icon-user font-bold text-6xl text-gray-400"></span>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Add / Change Image
                        </label>
                        <input type="file" id="file-upload" className="hidden" />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button className="bg-gray-800 text-white p-2 font-bold px-5 py-3">
                            Save
                        </button>
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default Photo;