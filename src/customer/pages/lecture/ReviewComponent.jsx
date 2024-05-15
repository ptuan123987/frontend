import React, { useEffect, useState,useRef } from "react";
import AuthService from "../../services/AuthService";
import css from "./Review.module.css";
import SearchInput from "./SearchInput";
import ReviewContent from "./ReviewContent";
import SelectDropdown from "./SelectDropdown";
import { API_URL, access_token } from "../../../Constants";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewComponent = ({ courseId }) => {
  const [reviewInfo, setReviewInfo] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const textareaRef = useRef(null);
  useEffect(() => {
    fetchReviewInfo();
  }, [courseId]);

  const fetchReviewInfo = async () => {
    try {
      const accessToken = AuthService.getCurrentAccessToken();
      const response = await fetch(API_URL + `api/courses/${courseId}/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setReviewInfo(data.data);
        console.log("Fetched Review Info:", data);
      } else {
        console.error("Failed to fetch Review information");
      }
    } catch (error) {
      console.error("Error fetching Review information:", error);
    }
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const submitComment = async () => {
    try {
      const response = await axios.post(
        `${API_URL}api/user/course-reviews`,
        {
          rating: rating,
          content: content,
          course_id: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log("Comment submitted successfully:", response.data);
      fetchReviewInfo();
      toast.success("Review Success!")
      setContent("");
      setRating(0);
    } catch (error) {
      toast.error("Error Sent Review")
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className={css.outerDiv}>
      <div className={css.reviewBox}>
        <div className={css.ttl}>Reviews</div>
        <div className={css.filters}>
          <span className={css.inptFilter}>
            <textarea
              className={`w-full h-32 p-2 border rounded focus:outline-none focus:border-blue-500 resize-none ${css.textarea}`}
              value={content}
              onChange={handleContentChange}
              placeholder="Leave a comment..."
            />
          </span>
          <div className="flex justify-between items-center flex-col gap-10">
            <span className={css.ratingSelect}>
              <select
                className={`border rounded p-2 focus:outline-none focus:border-blue-500 ${css.select} `}
                value={rating}
                onChange={handleRatingChange}
              >
                <option value={0}>Select rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </select>
            </span>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={submitComment}
            >
              Comment
            </button>
          </div>
        </div>
        {reviewInfo?.map((review) => {
          return (
            <div className={css.comment} key={review.id}>
              <ReviewContent data={review} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewComponent;
