import {configureStore, MiddlewareArray} from '@reduxjs/toolkit'; 
import productsReducer from './features/products/productsSlice';
import filterReducer from './features/filters/filtersSlice'; 
import cartReducer from './features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer, 
    filters: filterReducer, 
    cart: cartReducer
  }, 
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });
    return customizedMiddleware; 
  }
})
