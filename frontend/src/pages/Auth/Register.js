// Importa o arquivo de estilo CSS associado ao componente Register
import "./Auth.css";

// Importa componentes e utilitários necessários
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Importa hooks do React
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Importa ações do Redux
import { register, reset } from "../../slices/AuthSlices";

// Declaração do componente funcional Register
const Register = () => {
  // Estados locais para armazenar o nome, e-mail, senha e confirmação de senha do usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Função dispatch do Redux
  const dispatch = useDispatch();

  // Seletores do Redux para obter informações de loading e erros
  const { loading, error } = useSelector((state) => state.auth);

  // Função para lidar com o envio do formulário de registro
  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria um objeto 'user' com as propriedades necessárias com base nos valores do estado
    const user = { name, email, password, confirmPassword };

    // Despacha a ação de registro com os dados do usuário
    dispatch(register(user));
  };

  // Hook useEffect utilizado para limpar o estado de autenticação ao montar o componente
  useEffect(() => {
    // Dispatch (despacha) a ação 'reset()' para limpar todos os estados de autenticação
    dispatch(reset());
  }, [dispatch]);

  // Renderiza o JSX do componente Register
  return (
    <div>
      <div>
        <h1 id="titulo">PhotoConnect</h1>
        <div>
          <div id="register">
            <h1 id="titulo">Vamos lá!</h1>
            <p className="subtitle">Comece preenchendo o formulário abaixo!</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="email"
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
              <input
                type="password"
                placeholder="Confirme sua senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              {/* Renderiza o botão de cadastro e desabilita-o se estiver em estado de carregamento */}
              {!loading && <input type="submit" value="Cadastrar" />}
              {loading && <input type="submit" disabled value="Aguarde..." />}
              {/* Exibe mensagem de erro, se houver */}
              {error && <Message msg={error} type="error" />}
            </form>
            <p>
              Já tem uma conta? <Link to="/login">Clique aqui.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporta o componente Register para ser utilizado em outros lugares
export default Register;
