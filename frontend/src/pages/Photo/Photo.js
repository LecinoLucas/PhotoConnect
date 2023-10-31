import "./Photo.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import { Link } from "react-router-dom";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like } from "../../slices/photoSlices";


const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo);

 // Load photo data
 useEffect(() => {
  dispatch(getPhoto(id));
}, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

 // Like a photo
 const handleLike = () => {
  dispatch(like(photo._id));

  resetMessage();
};
  return( 
      <div id="photo">
  <PhotoItem photo={photo} />
  <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
  <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
  </div>
  );
  
  };
export default Photo