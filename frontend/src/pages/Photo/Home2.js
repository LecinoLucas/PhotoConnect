// Importando estilos, componentes, hooks e ações do Redux necessários para a página Home
//import "./pages/Home/Home.css";
import PhotoItem from "../../components/PhotoItem"; // Componente para exibir detalhes de uma foto
import LikeContainer from "../../components/LikeContainer"; // Componente para gerenciar curtidas
import { Link } from "react-router-dom"; // Componente de link para navegação
import { useEffect } from "react"; // Hook para efeitos colaterais
import { useSelector, useDispatch } from "react-redux"; // Hooks do Redux para acessar o estado global e despachar ações
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"; // Hook personalizado para resetar mensagens no componente
import { getPhotos, like } from "../../slices/photoSlices"; // Ações do Redux para obter fotos e dar like

const Home = () => {
  const dispatch = useDispatch(); // Inicializa o dispatch do Redux para despachar ações
  const resetMessage = useResetComponentMessage(dispatch); // Obtém função para resetar mensagens

  const { user } = useSelector((state) => state.auth); // Obtém informações do usuário do estado global
  const { photos, loading } = useSelector((state) => state.photo); // Obtém informações das fotos do estado global

  // Efeito que dispara a ação para obter fotos assim que o componente é montado
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  

  // Função para dar like em uma foto
  const handleLike = () => {
    dispatch(like(photos._id)); // Aqui está o erro: está tentando dar like em um array de fotos (photos) em vez de uma foto específica
    resetMessage(); // Reseta mensagens do componente
  };

  // Verifica se as fotos estão carregando, se estiverem, exibe uma mensagem de carregamento
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Renderização da página Home
  return (
    <div id="home">
         {Array.isArray(photos) && photos.length > 0 ? (
        photos.map((photo) => (
          <div key={photo._id}>
      <PhotoItem photo={photo} />
  <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
  <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
          </div>
        ))
      ) : (
   // Se não houver fotos, exibe uma mensagem e um link para começar
   <h2 className="no-photos">
   Ainda não há fotos publicadas,{" "}
   <Link to={`/users/${user._id}`}>clique aqui</Link> para começar.
 </h2>
)}
</div>
);
};

export default Home;  // Exporta o componente Home
