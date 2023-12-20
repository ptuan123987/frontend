import React from 'react';
import Layout from "../../components/Layout";
import CourseCard from '../../components/cards/CourseCard';

const wishlistData = [
    {
        id: 1,
        title: 'Javascript for Beginners',
        instructor: { name: 'Framework Tech' },
        rating: 4.6,
        ratings_count: 2607,
        price: '279,000',
        inflated_price: '1,099,000',
        image: 'assets/images/course-page/development-course/image1.png',
        link: '/course-link',
        time_updated: 'July 2023',
        description: 'Learn javascript online and supercharge your web design with this Javascript for beginners training course.'
    },
    {
        id: 2,
        title: 'Become a Certified Web Developer: HTML, CSS and JavaScript',
        instructor: { name: 'Framework Tech, Mark Lassoff' },
        rating: 4.5,
        ratings_count: 3545,
        price: '279,000',
        inflated_price: '1,399,000',
        image: 'assets/images/course-page/development-course/image2.png',
        link: '/course-link',
        time_updated: 'August 2023',
        description: 'Learn: HTML | CSS | JavaScript | Web programming | Web development | Front-end | Responsive | JQuery'
    },
]
const Wishlist = () => {
    return (
        <Layout>
            {/* <div className="wishlist-page-container">
                <h1>My Wishlist</h1>
                <div className="wishlist-items-container">
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((course) => (
                            <div key={course.id} className="wishlist-item">
                                <img src={course.image} alt={coursesData.title} className="course-image" />
                                <div className="course-info">
                                    <h2 className="course-title">{coursesData.title}</h2>
                                    <p className="course-author">{coursesData.author}</p>
                                    <p className="course-price">{coursesData.price}</p>
                                    <button className="remove-from-wishlist-btn">Remove</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your wishlist is empty.</p>
                    )}
                </div>
            </div> */}
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center my-8">My Wishlist</h1>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {wishlistData.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Wishlist;