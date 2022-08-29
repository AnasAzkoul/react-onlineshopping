import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; 
import axios from 'axios'
import { products_url, single_product_url } from '../../../utils/constants'; 

export const getProducts = createAsyncThunk(
  'products/getProducts', async () => {
    try {
      const response = await axios(products_url); 
      return response.data
    } catch (error) {
      console.log(error)
    }
})
  
export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct', async (id) => {
    try {
      const response = await axios(`${single_product_url}${id}`)
      return response.data; 
    } catch (error) {
      console.log(error);
    }
  }
)


const initialState = {
  isSidebarOpen: false, 
  products_loading: false, 
  products_error: false, 
  products: [], 
  featured_products: [], 
  single_product_loading: false, 
  single_product_error: false, 
  single_product: {}
}


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
    [getProducts.pending]: (state) => {
      state.products_loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      const featuredProducts = payload.filter((item) => item.featured === true);
      state.products_loading = false;
      state.products = payload;
      state.featured_products = featuredProducts;
    },
    [getProducts.rejected]: (state) => {
      state.products_loading = false;
      state.products_error = true;
    },
    [getSingleProduct.pending]: (state) => {
      state.single_product_loading = true; 
    }, 
    [getSingleProduct.fulfilled]: (state, {payload}) => {
      state.single_product_loading = false; 
      state.single_product = payload; 
    },
    [getSingleProduct.rejected]: (state) => {
      state.single_product_loading = false 
      state.single_product_error = true
    },
  },
});

export const {openSidebar, closeSidebar} = productsSlice.actions

export default productsSlice.reducer 
