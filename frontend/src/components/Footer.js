// Importa o estilo CSS associado ao componente Footer
import "./Footer.css";

// Declaração do componente funcional Footer
const Footer = () => {
  return ( 
    // Retorna a estrutura JSX do componente Footer
    <footer id="footer">
      {/* Exibe um parágrafo com informações de autoria e ano de copyright */}
      <p> PhotoConnect &copy; 2023 - Lecino Lucas, Renan Xavier, Leyla Borges</p>
    </footer>
  );
}; 

// Exporta o componente Footer para ser utilizado em outros lugares
export default Footer
