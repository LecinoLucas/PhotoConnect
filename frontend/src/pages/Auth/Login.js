import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/AuthSlices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado automaticamente (recarregando a página)

    // Cria um objeto 'user' com as propriedades 'email' e 'password' com base nos valores do estado
    const user = {
      email, // Suponhamos que 'email' seja uma variável que contém o email inserido no formulário
      password, // Suponhamos que 'password' seja uma variável que contém a senha inserida no formulário
    };

    // Chama a função 'dispatch' com a ação 'login', passando o objeto 'user' como argumento
    dispatch(login(user));
  };
  // Este trecho de código utiliza o hook useEffect para realizar uma ação quando o componente é montado.
  useEffect(() => {
    // Dispatch (despacha) a ação 'reset()' para limpar todos os estados de autenticação.
    dispatch(reset());
  }, [dispatch]); // [dispatch] é uma dependência que determina quando o useEffect será executado.

  // O useEffect é configurado para ser executado uma vez, quando o componente é montado, devido ao array de dependência vazio ([]).

  return (
    <div id="login">
      <h2> PhotoConnect</h2>
      <p className="subtitle"> Faça login para ver o que há de novo.</p>
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
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        {" "}
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
