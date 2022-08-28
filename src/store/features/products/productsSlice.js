import {createSlice} from '@reduxjs/toolkit';
import {getSingleProduct} from '../../productsThunk'; 


const initialState = {
  isSidebarOpen: false,
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.single_product_loading = true
    }, 
    [getSingleProduct.fulfilled]: (state, {payload}) => {
      state.single_product_loading = false; 
      state.single_product = payload;       
    }, 
    [getSingleProduct.rejected]: (state) => {
      state.single_product_loading = false; 
      state.single_product_error = true; 
    }
  }
});


export const {openSidebar, closeSidebar} = productsSlice.actions; 



export default productsSlice.reducer
