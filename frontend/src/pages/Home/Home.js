import "./Home.css";

// components
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";
import LikeButton from "../../components/LikeButton";
import { Link } from "react-router-dom";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhotos, like } from "../../slices/photoSlices";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photoId) => {
    dispatch(like(photoId));
  };


  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {Array.isArray(photos) ? (
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={() => handleLike(photo._id)} />
            {photo.likes && (
            <LikeButton
              isLiked={photo.likes.includes(user._id)}
              onClick={() => handleLike(photo._id)}
              likes={photo.likes.length}
            />
          )}
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))
      ) : (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
        </h2>
      )}
    </div>
  );
};

export default Home;
