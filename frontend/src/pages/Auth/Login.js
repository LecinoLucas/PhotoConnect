// Importa o arquivo de estilo CSS associado ao componente Login
import "./Auth.css";

// Importa componentes e utilitários necessários
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Importa hooks do React
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importa ações do Redux
import { login, reset } from "../../slices/AuthSlices";

// Declaração do componente funcional Login
const Login = () => {
  // Estados locais para armazenar o e-mail e a senha do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função dispatch do Redux
  const dispatch = useDispatch();

  // Seletores do Redux para obter informações de loading e erros
  const { loading, error } = useSelector((state) => state.auth);

  // Função para lidar com o envio do formulário de login
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado automaticamente (recarregando a página)

    // Cria um objeto 'user' com as propriedades 'email' e 'password' com base nos valores do estado
    const user = {
      email,
      password,
    };

    // Chama a função 'dispatch' com a ação 'login', passando o objeto 'user' como argumento
    dispatch(login(user));
  };

  // Hook useEffect utilizado para resetar o estado de autenticação ao montar o componente
  useEffect(() => {
    // Dispatch (despacha) a ação 'reset()' para limpar todos os estados de autenticação
    dispatch(reset());
  }, [dispatch]); // [dispatch] é uma dependência que determina quando o useEffect será executado

  // O useEffect é configurado para ser executado uma vez, quando o componente é montado, devido ao array de dependência vazio ([]).

  // Renderiza o JSX do componente Login
  return (
    <div id="login">
      <div>
        <h2>PhotoConnect</h2>
        <p className="subtitle"> Compartilhe, Conecte e Resolva</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* Renderiza o botão de login e desabilita-o se estiver em estado de carregamento */}
          {!loading && <input type="submit" value="Entrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {/* Exibe mensagem de erro, se houver */}
          {error && <Message msg={error} type="error" />}
        </form>
        <p>
          Não tem uma conta? <Link to="/register">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
};

// Exporta o componente Login para ser utilizado em outros lugares
export default Login;
