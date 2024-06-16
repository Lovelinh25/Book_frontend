import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userService } from './userService';

const initialState = {
  isLoggedIn: false,
  jwt: '',
  currentUser: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  loginPageMessage: '',
  registerPageMessage: '',
};

export const register = createAsyncThunk(
  'user/register',
  async (data, thunkAPI) => {
    try {
      console.log('user/register', data);
      return await userService.register(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    return await userService.login(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk('user/logout', async (thunkAPI) => {
  try {
    return await userService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoginPageMessage: (state) => {
      state.loginPageMessage = '';
    },
    resetRegisterPageMessage: (state) => {
      state.registerPageMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.loginPageMessage = 'Register successful.';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.registerPageMessage = action.payload.response.data.message;
      })
      // LOGIN
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.loginPageMessage = 'Incorrect credentials. Please try again.';
      })
      // LOGOUT
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.currentUser = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.loginPageMessage = 'Logout successful.';
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { resetLoginPageMessage, resetRegisterPageMessage } =
  userSlice.actions;

export default userSlice.reducer;
