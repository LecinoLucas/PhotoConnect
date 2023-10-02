import React from "react";
import { createRoot } from "react-dom/client"; // Importa createRoot de react-dom/client
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";

// Cria um "root" usando a função createRoot, que é uma nova API introduzida no React 18.
const root = createRoot(document.getElementById("root"));

// Renderiza o aplicativo React dentro do "root".
root.render(
  <React.StrictMode>
    {/* Wraps the entire application in React.StrictMode */}
    <Provider store={store}>
      {/* Provides Redux store to the application */}
      <App />
      {/* Renders the main App component */}
    </Provider>
  </React.StrictMode>
);

// Registra informações de desempenho (reportWebVitals).
reportWebVitals();
