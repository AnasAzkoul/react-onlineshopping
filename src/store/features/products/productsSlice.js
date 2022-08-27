import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};


const productsSlice = createSlice({
  name: 'products', 
  initialState, 
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true 
    }, 
    closeSidebar: (state) => {
      state.isSidebarOpen = false
    }
  }
})


export const {openSidebar, closeSidebar} = productsSlice.actions; 

export default productsSlice.reducer
