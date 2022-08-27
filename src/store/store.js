import {configureStore} from '@reduxjs/toolkit'; 
import productsReducer from './features/products/productsSlice';
import filterReducer from './features/filters/filtersSlice'; 


export const store = configureStore({
  reducer: {
    products: productsReducer, 
    filters: filterReducer, 
    
  }
})
