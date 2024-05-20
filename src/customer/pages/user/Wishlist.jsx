import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import CourseCard from '../../components/cards/CourseCard';
import CardItem from '../../components/cards/CartItem';
import useWishlistStore from '../../stores/useWishlistStore';
import ReactLoading from 'react-loading';

const Wishlist = () => {
  const { wishlist, fetchWishlist } = useWishlistStore((state) => ({
    wishlist: state.wishlist,
    fetchWishlist: state.fetchWishlist,
  }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWishlist().then(() => {
      setIsLoading(false);
    });
  }, [fetchWishlist]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center my-8">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {isLoading ? (
            <div className=" flex fixed left-[50%] transform  w-full h-full">
              <ReactLoading type="spin" color="#000" height={50} width={50} />
            </div>
          ) : wishlist?.length > 0 ? (
            wishlist.map((course) => (
              <CourseCard key={course.course.id} course={course.course} className="" />
            ))
          ) : (
            <p className="text-2xl text-center p-50">
              No courses in wishlist.{' '}
              <button>
                <a href="/" className="text-blue-600 font-bold text-xl">
                  Browse course now.
                </a>
              </button>
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
