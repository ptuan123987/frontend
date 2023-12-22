import React, { useEffect } from 'react';
import Layout from "../../components/Layout";
import CourseCard from '../../components/cards/CourseCard';
import useWishlistStore from '../../stores/useWishlistStore';

const Wishlist = () => {
    // USING LOCAL STORAGE
    const wishlistCourses = useWishlistStore(state => state.wishlist);

    // USING API
    // const { wishlistCourses, fetchWishlist } = useWishlistStore((state) => ({
    //     wishlist: state.wishlist,
    //     fetchWishlist: state.fetchWishlist
    //   }));
    // useEffect(() => {
    //     fetchWishlist();
    // }, [fetchWishlist]);

    return (
        <Layout>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center my-8">My Wishlist</h1>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {wishlistCourses?.length > 0 ? (
                        wishlistCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <p className='text-2xl text-center p-50'>No courses in wishlist. <button><a href="/" className="text-blue-600 font-bold text-xl">Browse course now.</a></button></p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Wishlist;