// Importa o arquivo de estilo CSS para o componente Message
import "./Message.css";

// Define o componente Message como uma função de componente (functional component)
const Message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

// Exporta o componente Message como padrão
export default Message;
