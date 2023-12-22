import { useState } from "react";
import thumbsCircleWhiteIcon from "../../../icon/like-hand-symbol-in-a-circle-white.png";
import thumbsCircleIcon from "../../../icon/like-hand-symbol-in-a-circle.png";
import starIcon from "../../../icon/star.png";

import css from "./ReviewContent.module.css"

const ReviewContent = (props) => {
  const {
    id,
    user: { display_name, img } = {},
    rating = 0,
    content,
    date: created_at = new Date(),
  } = props.data;
  console.log(props.data );
  const [liked, setLiked] = useState("");

  const likeHandler = (value) => {
    setLiked((prev) => {
      if (prev === value) {
        return "";
      }
      return value;
    });
  };

  return (
    <div className={css.outerDiv}>
      <div className={css.leftBar}>
        <div className="default-avatar">
            <span>{display_name ? display_name.charAt(0).toUpperCase() : '@'}</span>
        </div>
        {/* <img src={img} alt="profile pic" className={css.img} /> */}
      </div>
      <div className={css.rightBar}>
        <div className={css.ttl}>{display_name}</div>
        <div className={css.ratingBox}>
          <div className={css.rating}>
            {Array.from(new Array(rating), (_, i) => (
              <img
                src={starIcon}
                key={`star-${i}`}
                alt="star"
                className={css.starIcon}
              />
            ))}
          </div>
            <div className={css.time}>{new Date(created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</div>
        </div>
        <div className={css.cnt}>{content}</div>
        <div className={css.fdbkBox}>
          <div className={css.box1}>Was this review helpful?</div>
          <div className={css.box2}>
            <img
              onClick={() => likeHandler("liked")}
              src={liked === "liked" ? thumbsCircleIcon : thumbsCircleWhiteIcon}
              alt="thumbs down"
              className={css.fdbkIcon}
            />
            <img
              onClick={() => likeHandler("disliked")}
              src={
                liked === "disliked" ? thumbsCircleIcon : thumbsCircleWhiteIcon
              }
              alt="thumbs up"
              className={css.fdbkIconR}
            />
            <div className={css.fdbkRptTxt}>Report</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewContent;