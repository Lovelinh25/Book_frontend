import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {
  register,
  login,
  logout,
  resetLoginPageMessage,
  resetRegisterPageMessage,
} from "./user/userSlice";

export {
  add,
  get,
  deleteCart,
  resetCartPageMessage,
  resetProductPageMessage,
  resetCart,
} from "./cart/cartSlice";

export { persistor };
export default store;
