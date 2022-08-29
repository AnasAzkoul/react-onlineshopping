import {configureStore} from '@reduxjs/toolkit';
import productReducer from './features/ProductsSlice/ProductsSlice'; 
import filtersReducer from './features/filters/filtersSlice'; 
import cartReducer from './features/cart/cartSlice'; 


export const store = configureStore({
  reducer: {
    products: productReducer, 
    filters: filtersReducer, 
    cart: cartReducer, 
  },
  middleware: (getDefaultMiddleware) => {
   const customizedMiddleware = getDefaultMiddleware({
     serializableCheck: false,
   });
    return customizedMiddleware; 
  }
})
