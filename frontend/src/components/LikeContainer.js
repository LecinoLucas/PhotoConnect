import "./LikeContainer.css";

import { BsHeart, BsHeartFill, BsStar, BsStarFill } from "react-icons/bs";

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsStarFill  />
          ) : (
            <BsStar  onClick={() => handleLike(photo)} />
          )}
          <p>{photo.likes.length} Avaliação(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
