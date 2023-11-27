// Importa o arquivo de estilo CSS associado ao componente Message
import "./Message.css";

// Define o componente Message como uma função de componente (functional component)
const Message = ({ msg, type }) => {
  // Retorna JSX representando o componente Message
  return (
    <div className={`message ${type}`}>
      {/* Renderiza um parágrafo contendo a mensagem (msg) recebida como propriedade */}
      <p>{msg}</p>
    </div>
  );
};

// Exporta o componente Message como padrão para ser utilizado em outros lugares
export default Message;
