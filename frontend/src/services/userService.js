import { api, requestConfig } from "../utils/config";

// Importa as configurações da API e a função requestConfig de um arquivo de utilitário

// Função para obter os detalhes do usuário
const profile = async (data, token) => {
    // A função 'profile' aceita dois argumentos: 'data' (dados da solicitação) e 'token' (token de autenticação)

    const config = requestConfig("GET", data, token);
    // Cria uma configuração para a solicitação, usando a função 'requestConfig'.
    // Isso inclui o método "GET", os dados da solicitação (se houver) e o token de autenticação (se fornecido).

    try {
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);
        // Realiza uma solicitação à API para obter os detalhes do usuário.
        // Utiliza a URL da API concatenada com "/users/profile" e a configuração da solicitação.
        // Converte a resposta em JSON usando '.json()' e trata erros com '.catch()'.

        return res;
        // Retorna os detalhes do usuário (ou uma resposta de erro, se houver) após a conclusão da solicitação.
    } catch (error) {
        console.log(error);
        // Registra qualquer erro que ocorra durante a solicitação no console.
    }
};

// Objeto 'userService' que encapsula as funções relacionadas ao usuário
const userService = {
    profile, // Função para obter os detalhes do usuário
    // Outras funções relacionadas ao usuário podem ser adicionadas aqui
};

// Exporta o objeto 'userService' para que ele possa ser usado em outros lugares do código.
