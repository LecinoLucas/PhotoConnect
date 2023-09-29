// Define as URLs da API e dos uploads
export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

// Função para criar configurações de solicitação HTTP
export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  // Verifica se há uma imagem a ser enviada na solicitação
  if (image) {
    config = {
      method: method,
      body: data,
      headers: {},
    };
  }
  // Verifica se o método é DELETE ou se não há dados a serem enviados exemplo like
  else if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  }
  // Caso contrário, assume que os dados são em formato JSON
  else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  // Adiciona o token de autorização, se fornecido
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // Retorna a configuração da solicitação
};
