// Importa a ação resetMessage do slice photoSlices
import { resetMessage } from "../slices/photoSlices";

// Declaração do hook useResetComponentMessage
export const useResetComponentMessage = (dispatch) => {
  // Retorna uma função que, quando chamada, despacha a ação resetMessage após 2000 milissegundos (2 segundos)
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
