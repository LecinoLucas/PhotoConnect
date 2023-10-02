import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define o estado inicial do slice
const initialState = {
  user: {},         // Armazena informações do usuário
  error: false,     // Indica se ocorreu um erro
  success: false,   // Indica se a ação foi bem-sucedida
  loading: false,   // Indica se uma operação está em andamento
  message: null,    // Armazena mensagens associadas à ação
};

// Criação do reducer usando createSlice
export const userSlice = createSlice({
  name: "user",     // Nome do slice
  initialState,     // Estado inicial
  reducers: {
    resetMessage: (state) => {
      // Um reducer que redefine a mensagem para null
      state.message = null;
    },
  },
});

// Exporta as ações geradas pelo slice
export const { resetMessage } = userSlice.actions;

// Exporta o reducer gerado pelo slice
export default userSlice.reducer;
