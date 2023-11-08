// LikeButton.js

import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeButton = ({ isLiked, onClick, likes }) => {
  return (
    <div className="like-button">
      {isLiked ? (
        <BsHeartFill onClick={onClick} />
      ) : (
        <BsHeart onClick={onClick} />
      )}
      <p>{likes} like(s)</p>
    </div>
  );
};

export default LikeButton;
