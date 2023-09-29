// Importa as configurações da API e a função requestConfig do arquivo de configuração
import { api, requestConfig } from "../utils/config";

// Função para registrar um usuário
const register = async (data) => {
  // Cria uma configuração de solicitação POST usando os dados fornecidos
  const config = requestConfig("POST", data);

  try {
    // Realiza uma solicitação POST para a rota de registro da API
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json()) // Converte a resposta em JSON
      .catch((err) => err); // Lida com erros de rede

    // Se a resposta for bem-sucedida, armazena as informações do usuário no localStorage
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res; // Retorna a resposta da API
  } catch (error) {
    console.log(error); // Lida com erros de exceção
  }
};

// Função para fazer logout de um usuário
const logout = () => {
   //Remove as informações do usuário do localStorage
  localStorage.removeItem("user");
};

// Função para fazer login de um usuário
const login = async (data) => {
  // Cria uma configuração de solicitação POST usando os dados fornecidos
  const config = requestConfig("POST", data);

  try {
    // Realiza uma solicitação POST para a rota de login da API
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json()) // Converte a resposta em JSON
      .catch((err) => err); // Lida com erros de rede

    // Se a resposta for bem-sucedida, armazena as informações do usuário no localStorage
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res; // Retorna a resposta da API
  } catch (error) {
    console.log(error); // Lida com erros de exceção
  }
};

// Um objeto que contém as funções de serviço relacionadas à autenticação
const authService = {
  register, // Função de registro de usuário
  logout,   // Função de logout
 // login,    // Função de login de usuário
};

export default authService; // Exporta o objeto authService como padrão
