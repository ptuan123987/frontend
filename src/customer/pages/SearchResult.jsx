import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CartItemSearch from '../components/cards/CartItemSearch';
import Layout from '../components/Layout';
import CourseService from '../services/CourseService';
import ReactLoading from 'react-loading';

const SearchResults = () => {
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('query');
        setQuery(searchQuery);

        const fetchCourses = async () => {
            if (searchQuery) {
                try {
                    const results = await CourseService.searchCourseByName(searchQuery);
                    setCourses(results);
                } catch (error) {
                    console.error('Error fetching search results:', error.message);
                } finally {
                    setLoading(false); 
                }
            }
        };
        fetchCourses();
    }, [location]);

    return (
        <Layout>
            <div className="cart-wrapper py-10 m-5">
                <div className="cart-pg-title mb-6">
                    <h3 className="text-3xl font-semibold">Courses Search : {query}</h3>
                </div>

                <div className="cart-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="cart-grid-left col-span-2">
                        <div className="flex justify-between mb-6">
                            <div className="cart-count-info text-lg font-medium">
                                <span className="font-bold">{courses.length}</span> Course{courses.length !== 1 && 's'} 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-items-list grid gap-4">
                    {loading ? ( 
                        <div className="flex items-center justify-center mt-10">
                            <ReactLoading type="spin" color="#000" height={50} width={50} />
                        </div>
                    ) : (
                        courses.length > 0 ? (
                            courses.map(course => (
                                <Link to={`/course/${course.id}`} className="hover:bg-gray-100 transition">
                                    <CartItemSearch
                                        key={course.id}
                                        course={course}
                                        isSelected={false}
                                        onToggleItem={() => {}}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p>No courses found.</p>
                        )
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default SearchResults;
