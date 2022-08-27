import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'
import {products_url as url} from '../utils/constants'; 

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    // const response = await productsAPI.endpoints.getAllProducts;
    const response = await axios(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
