// Importa a função 'configureStore' do Redux Toolkit para criar a loja (store)
import { configureStore } from "@reduxjs/toolkit";

 //Importa os reducers (redutores) de cada slice (parte) do estado
import authReducer from "./slices/AuthSlices";
//import userReducer from "./slices/userSlice";
//import photoReducer from "./slices/photoSlice";

// Cria a loja (store) do Redux configurada com os reducers
export const store = configureStore({
  // Define os reducers que serão usados para gerenciar o estado da aplicação
  reducer: {
    auth: authReducer,     // Reducer para o estado de autenticação
   // user: userReducer,     // Reducer para o estado do usuário
    //photo: photoReducer,   // Reducer para o estado de fotos*/
  },
});
