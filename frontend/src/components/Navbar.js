// Importa o arquivo de estilo CSS associado ao componente Navbar
import "./Navbar.css";

// Importa hooks e recursos necessários
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Importa ações do Redux
import { logout, reset } from "../slices/AuthSlices";

// Importa componentes e ícones do Bootstrap
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Declaração do componente funcional Navbar
const Navbar = () => {
  // Obtém informações de autenticação
  const { auth } = useAuth();
  // Obtém informações do usuário do estado global utilizando o Redux
  const { user } = useSelector((state) => state.auth);

  // Estado local para armazenar a consulta de pesquisa
  const [query, setQuery] = useState("");

  // Hook de navegação do react-router-dom
  const navigate = useNavigate();

  // Função dispatch do Redux
  const dispatch = useDispatch();

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    // Despacha ação de logout e reset para limpar o estado
    dispatch(logout());
    dispatch(reset());

    // Navega para a página de login
    navigate("/login");
  };

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      // Navega para a página de resultados de pesquisa
      return navigate(`/search?q=${query}`);
    }
  };

  // Renderiza o JSX do componente Navbar
  return (
    <nav id="nav">
      {/* Link para a página inicial */}
      <Link to="/">
        <BsFillCameraFill /> PhotoConnect
      </Link>

      {/* Formulário de pesquisa */}
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        {/* Input para inserção de texto para pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* Lista de links de navegação */}
      <ul id="nav-links">
        {auth ? (
          // Se autenticado, renderiza links para a página inicial, perfil, e opção de sair
          <>
            <li>
              <NavLink to="/">
                {" "}
                <BsHouseDoorFill />{" "}
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          // Se não autenticado, renderiza links para as páginas de login e registro
          <>
            <li>
              <NavLink to="/login"> Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register"> Registrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Exporta o componente Navbar para ser utilizado em outros lugares
export default Navbar;
