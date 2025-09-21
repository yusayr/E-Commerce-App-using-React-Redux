import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice"; 
import authReducer from "./authSlice";
import searchReducer from "./searchSlice"; 

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer, 
    search: searchReducer,
  },
});

export default store;
