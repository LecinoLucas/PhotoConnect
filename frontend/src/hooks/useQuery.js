// Importa o hook useLocation do pacote "react-router-dom"
import { useLocation } from "react-router-dom";

// Importa o hook useMemo do pacote "react"
import { useMemo } from "react";

// Define uma função chamada useQuery
export function useQuery() {
  // Utiliza o hook useLocation para obter a propriedade 'search' do objeto de localização
  const { search } = useLocation();

  // Utiliza o hook useMemo para memorizar e recalcular o valor apenas quando a 'search' mudar
  return useMemo(() => new URLSearchParams(search), [search]);
}
