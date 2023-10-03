import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/adminUsersSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    users: usersReducer,
  },
  devTools: true,
});

export default store;
