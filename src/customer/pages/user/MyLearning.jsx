import React from 'react';
import Layout from "../../components/Layout";
import './Profile.css';

const MyLearning = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center my-8">My learning</h1>
                <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px">
                        <li class="me-2">
                            <a href="/allcourses" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" aria-current="page">All Courses</a>
                        </li>
                        <li class="me-2">
                            <a href="/mylists" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500">My Lists</a>
                        </li>
                        <li class="me-2">
                            <a href="/wishlist" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Wishlist</a>
                        </li>
                        <li class="me-2">
                            <a href="/learningtools" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Learning tools</a>
                        </li>
                    </ul>
                </div>
                <div className="notification-bar my-4 p-4 bg-gray-100 rounded p-10 mt-10">
                    <div className="items-center">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                dataSlot="icon"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <div>
                                <p className="font-bold text-gray-800">Schedule learning time</p>
                                <p text-gray-600>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.</p>
                            </div>
                        </div>
                        <div className="flex justify-start mt-4">
                            <button className="bg-black text-white px-5 py-3 ml-10 mt-5 text-sm font-medium">Get started</button>
                            <button className="text-gray-800 px-5 py-3 ml-6 mt-5 text-sm font-medium">Dismiss</button>
                        </div>
                    </div>
                </div>
                <div className="text-center my-8 p-10">
                    <p className="text-xl text-gray-800">Start learning from over 210,000 courses today.</p>
                    <p className='text-gray-600'>When you purchase a course, it will appear here. <a href="/" className="text-blue-600">Browse now.</a></p>
                </div>
            </div>
        </Layout>
    );
};

export default MyLearning;