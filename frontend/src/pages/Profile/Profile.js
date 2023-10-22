import "./Profile.css";

import { uploads } from "../../utils/config";

/*/ components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";*/

// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";

const Profile = () => {
  // Obtém o parâmetro 'id' da URL usando o hook 'useParams'
  const { id } = useParams();

  // Obtém a função 'dispatch' do Redux para despachar ações
  const dispatch = useDispatch();

  // Usa o hook 'useSelector' para acessar o estado da aplicação
  // 'state.user' e 'state.auth' representam os estados do Redux
  const { user, loading } = useSelector((state) => state.user); // Obtém informações do usuário do estado do Redux
  const { user: userAuth } = useSelector((state) => state.auth); // Obtém informações do usuário autenticado do estado do Redux

  //new form an edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    // Dispara duas ações assíncronas para obter os detalhes do usuário e suas fotos
    dispatch(getUserDetails(id)); // Obtém os detalhes do usuário com base no 'id'
    //  dispatch(getUserPhotos(id)); // Obtém as fotos do usuário com base no 'id'
  }, [dispatch, id]);

  // Publish a new photo
  const submitHandle = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu: </h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto:</span>
                <input type="text" placeholder="Insira um título" />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" />
              </label>
              <input type="submit" value="Postar" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
