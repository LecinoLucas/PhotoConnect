import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Define o hook personalizado useAuth
export const useAuth = () => {
  // Obtém o estado do usuário do Redux usando o useSelector
  const { user } = useSelector((state) => state.auth);

  // Define os estados locais do hook
  const [auth, setAuth] = useState(false); // Estado de autenticação (true se o usuário estiver autenticado, caso contrário, false)
  const [loading, setLoading] = useState(true); // Estado de carregamento (true enquanto os dados de autenticação estão sendo verificados)

  // Define um efeito colateral usando useEffect
  useEffect(() => {
    // Verifica se há um usuário (usuário autenticado)
    if (user) {
      setAuth(true); // Define o estado de autenticação como verdadeiro
    } else {
      setAuth(false); // Define o estado de autenticação como falso
    }

    setLoading(false); // Define o estado de carregamento como falso (a verificação de autenticação foi concluída)
  }, [user]); // O efeito é acionado sempre que o valor de 'user' no estado Redux for alterado

  // Retorna um objeto com o estado de autenticação (auth) e o estado de carregamento (loading)
  return { auth, loading };
};
