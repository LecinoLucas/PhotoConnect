import "./Home.css";
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { getPhotos, like } from "../../slices/photoSlices";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);


  const { photos, loading } = useSelector((state) => state.photo);
  

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photoIndex) => {
    const photoId = photos[photoIndex]._id;
    dispatch(like(photoId));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {photos && photos.length > 0 ? (
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={() => handleLike(photo._id)} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))
      ) : (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,{" "}
          <Link to={`/users/${user._id}`}>clique aqui</Link> para começar.
        </h2>
      )}
    </div>
  );
};

export default Home;