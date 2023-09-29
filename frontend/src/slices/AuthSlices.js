// Importa funções e módulos necessários do Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Importa o serviço de autenticação authService
import authService from "../services/AuthService";

// Obtém os dados do usuário armazenados no localStorage (se existirem)
const user = JSON.parse(localStorage.getItem("user"));

// Define o estado inicial do slice de autenticação
const initialState = {
  user: user ? user : null, // Define o usuário como nulo ou com base nos dados do localStorage
  error: false,            // Define o erro como falso
  success: false,          // Define o sucesso como falso
  loading: false,          // Define o carregamento como falso
};

// Cria uma ação assíncrona para registrar um usuário
export const register = createAsyncThunk("auth/register",
  async (user, thunkAPI) => {
    const data = await authService.register(user); // Chama a função de registro no serviço authService

    // Verifica se há erros na resposta
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Cria um slice Redux para o estado de autenticação
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // Define o estado de loading, erro e sucesso como falso
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        // Define o estado de loading como verdadeiro e erro como nulo
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        // Define o estado de loading como falso, sucesso como verdadeiro, erro como nulo e atualiza o usuário
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      });
  },
});

// Exporta as ações do slice de autenticação
export const { reset } = authSlice.actions;

// Exporta o reducer do slice de autenticação
export default authSlice.reducer;
