import React, {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import css from "./Review.module.css";
import SearchInput from "./SearchInput";
import ReviewContent from "./ReviewContent";
import SelectDropdown from "./SelectDropdown";

const ReviewComponent = ( {courseId} ) => {
    const [reviewInfo, setReviewInfo] = useState(null);
    const [filter, setFilter] = useState({
        searchFilter: "",
        drpFilter: {
        key: "All Ratings",
        value: "All Ratings",
        },
    });

    console.log(reviewInfo);
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
                    setReviewInfo(data.data);
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

    const filterHandler = (e) => {
        setFilter((p) => {
        return {
            ...p,
            searchFilter: e.target.value,
        };
        });
    };

    const drpFilterOptions = [
        {
        key: "All Ratings",
        value: "All Ratings",
        },
        {
        key: "Five Stars",
        value: "Five Stars",
        },
    ];

    return (
    <div className={css.outerDiv}>
      {/* <div className={css.ratingsBox}>
        <div className={css.ttl}>Student feedback</div>
        <RatingsView data={ratingsdata} />
      </div> */}
      <div className={css.reviewBox}>
        <div className={css.ttl}>Reviews</div>
        <div className={css.filters}>
          <span className={css.inptFilter}>
            <SearchInput
              state={filter.searchFilter}
              onChange={filterHandler}
              placeholderTxt="Search reviews"
              iconPosition="right"
            />
          </span>
          <span className={css.drpFilter}>
            <SelectDropdown
              id="drpFilter"
              label="Filter ratings"
              filterType="drpFilter"
              defaultValue={filter.drpFilter}
              value={filter.drpFilter}
              setValue={setFilter}
              options={drpFilterOptions}
            />
          </span>
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