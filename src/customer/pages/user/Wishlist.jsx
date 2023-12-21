import React from 'react';
import Layout from "../../components/Layout";
import CourseCard from '../../components/cards/CourseCard';
import useWishlistStore from '../../stores/useWishlistStore';

const Wishlist = () => {
    const wishlistCourses = useWishlistStore(state => state.wishlist);

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center my-8">My Wishlist</h1>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {wishlistCourses.length > 0 ? (
                        wishlistCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <p>No courses in wishlist.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Wishlist;