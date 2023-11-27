// Importa o arquivo de estilo CSS associado ao componente Profile
import "./EditProfile.css";

// Importa a configuração de uploads do utilitário config
import { uploads } from "../../utils/config";

// Importa hooks do React
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importa ações do Redux relacionadas ao perfil do usuário
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Importa o componente Message
import Message from "../../components/Message";

// Declaração do componente funcional Profile
const Profile = () => {
  // Função dispatch do Redux
  const dispatch = useDispatch();

  // Seletores do Redux para obter informações do estado do usuário
  const { user, message, error, loading } = useSelector((state) => state.user);

  // Estados locais para armazenar dados do usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Carrega dados do usuário ao montar o componente
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Preenche o formulário do usuário com os dados carregados
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  // Função para lidar com o envio do formulário de edição de perfil
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Coleta dados do usuário a partir dos estados locais
    const userData = {
      name,
    };

    // Adiciona dados opcionais ao objeto userData se eles estiverem presentes nos estados locais
    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // Cria um objeto FormData para envio de dados binários (como imagens) no formulário
    const formData = new FormData();

    // Adiciona cada par chave/valor ao FormData
    Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    // Despacha a ação de atualização do perfil com os dados do usuário
    await dispatch(updateProfile(formData));

    // Reseta a mensagem após 2000 milissegundos (2 segundos)
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // Função para lidar com a seleção de um arquivo de imagem
  const handleFile = (e) => {
    // Pré-visualização da imagem
    const image = e.target.files[0];
    setPreviewImage(image);

    // Atualiza o estado da imagem do perfil
    setProfileImage(image);
  };

  // Renderiza o JSX do componente Profile
  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais um pouco sobre você...
      </p>
      {/* Renderiza a imagem de perfil ou a pré-visualização se estiver disponível */}
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário para editar o perfil */}
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        {/* Campo para seleção de arquivo de imagem */}
        <label>
          <span>Imagem de Perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha..."
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {/* Renderiza o botão de atualização e desabilita-o se estiver em estado de carregamento */}
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {/* Exibe mensagem de erro, se houver */}
        {error && <Message msg={error} type="error" />}
        {/* Exibe mensagem de sucesso, se houver */}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

// Exporta o componente Profile para ser utilizado em outros lugares
export default Profile;
