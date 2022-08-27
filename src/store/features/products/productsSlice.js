import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {products_url as url} from '../../../utils/constants';
import { useSelector } from 'react-redux';

// getProducts function is dispatched in the App component
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    // const response = await productsAPI.endpoints.getAllProducts;
    const response = await axios(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  filtered_products: [], 
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
    [getProducts.fulfilled]: (state, action) => {
      state.products_loading = false;
      state.products = action.payload
      state.filtered_products = state.products;
      state.featured_products = state.products.filter(product => product.featured === true); 
    },
    [getProducts.rejected]: (state) => {
      state.products_loading = false;
      state.products_error = true;
    },
  },
});


export const {openSidebar, closeSidebar} = productsSlice.actions; 



export default productsSlice.reducer
