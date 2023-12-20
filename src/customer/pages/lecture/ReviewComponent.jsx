import React, {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";

const ReviewComponent = ( {courseId} ) => {
    const [reviewInfo, setReviewInfo] = useState(null);

    useEffect(() => {
        const fetchReviewInfo = async () => {
            try {
                const accessToken = AuthService.getCurrentAccessToken(); // Lấy access token từ AuthService
                const response = await fetch(`https://api-study.salyr.online/api/courses/${courseId}/reviews?pageNum=1&pageSize=15`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // Sử dụng access token từ AuthService
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setReviewInfo(data);
                    console.log('Fetched Review Info:', data); // Logging fetched data
                } else {
                    console.error('Failed to fetch Review information');
                }
            } catch (error) {
                console.error('Error fetching Review information:', error);
            }
        };

        fetchReviewInfo();
    }, [courseId]);

    return (
        <div>
            {reviewInfo ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {reviewInfo.data.map(review => (
                            <div key={review.id} className="border p-4 rounded">
                                <p className="text-gray-600 mb-2">{review.user.display_name}</p>
                                <p className="text-gray-800 font-semibold mb-2">Rating: {review.rating}</p>
                                <p className="text-gray-700">{review.content}</p>
                                <p className="text-gray-500 text-sm mt-2">{review.created_at}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default ReviewComponent;