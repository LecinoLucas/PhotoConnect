// Importações das bibliotecas necessárias
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

// Estado inicial do slice do usuário
const initialState = {
  user: {},         // Objeto para armazenar os detalhes do usuário
  error: false,     // Sinalizador para erros
  success: false,   // Sinalizador para sucesso
  loading: false,   // Sinalizador para indicar se uma operação está em andamento
  message: null,    // Mensagem para feedback do usuário
};

// Thunks assíncronos para interagir com a API

// Thunk para obter detalhes do usuário (usado para edição)
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.profile(user, token);

    console.log(data);

    return data;
  }
);

// Thunk para atualizar os detalhes do usuário
export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    // Verifica se há erros na resposta da API
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    console.log(data);

    return data;
  }
);

// Thunk para obter detalhes do usuário
export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.getUserDetails(id, token);

    console.log(data);

    return data;
  }
);

// Slice do Redux para gerenciar o estado do usuário
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null; // Redefine a mensagem no estado para null
    },
  },
  extraReducers: (builder) => {
    builder
      // Manipuladores de ações assíncronas gerados automaticamente pelo Redux Toolkit
      .addCase(profile.pending, (state) => {
        state.loading = true; // Define o sinalizador de carregamento como verdadeiro
        state.error = null;   // Limpa o sinalizador de erro
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;      // Define o sinalizador de carregamento como falso
        state.success = true;       // Define o sinalizador de sucesso como verdadeiro
        state.error = null;         // Limpa o sinalizador de erro
        state.user = action.payload; // Atualiza os detalhes do usuário com os dados recebidos
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Define o erro com os detalhes do erro
        state.user = null;           // Remove os detalhes do usuário
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      });
  },
});

// Exporta a ação 'resetMessage' para redefinir a mensagem no estado
export const { resetMessage } = userSlice.actions;

// Exporta o redutor do slice do usuário
export default userSlice.reducer;
