import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { cartService } from "./cartService";

const initialState = {
  currentCart: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  productPageMessage: "",
  cartPageMessage: "",
};

export const add = createAsyncThunk("cart/add", async (data, thunkAPI) => {
  try {
    return await cartService.add(data, data.token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const get = createAsyncThunk("cart/get", async (data, thunkAPI) => {
  try {
    return await cartService.get(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (data, thunkAPI) => {
    try {
      return await cartService.deleteCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetProductPageMessage: (state) => {
      state.productPageMessage = "";
    },
    resetCartPageMessage: (state) => {
      state.cartPageMessage = "";
    },
    resetCart: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(add.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.currentCart.cartItems = [
          ...state.currentCart.cartItems,
          action.payload,
        ];
        state.productPageMessage = "Add cart successful.";
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.registerPageMessage = action.payload.response.data.message;
      })
      // GET
      .addCase(get.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.currentCart = action.payload;
      })
      .addCase(get.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      // DELETE
      .addCase(deleteCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.currentUser = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        console.log(action.payload);
        state.currentCart.cartItems = state.currentCart.cartItems.filter(
          (c) => c.id !== action.payload
        );
        state.cartPageMessage = "Delete cart successful.";
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { resetCartPageMessage, resetProductPageMessage, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
