import {createSlice} from '@reduxjs/toolkit'; 
import {getProducts} from '../../productsThunk';
import {
  handleUpdateSort,
  handleSortProducts,
  handleUpdateFilters,
  handleClearFilters,
  loadProducts,
  handleFilterProducts,
} from './filtersActions'; 

const initialState = {
  filtered_products: [],
  all_products_loading: false, 
  all_products_error: false, 
  all_products: [], 
  featured_products: [],
  grid_view: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};


const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateSort: (state, action) => {
      handleUpdateSort(state, action); 
    },
    SortProducts: (state) => {
      handleSortProducts(state); 
    },
    updateFilters: (state, { payload }) => {
      handleUpdateFilters(state, payload)
    },
    clearFilters: (state) => {
      handleClearFilters(state); 
    },
    sortProducts: (state) => {
      handleFilterProducts(state); 
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.all_products_loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      loadProducts(state, payload); 
    },
    [getProducts.rejected]: (state) => {
      state.all_products_loading = false;
      state.all_products_error = true;
    },
  },
});

export const {
  updateSort,
  SortProducts, 
  updateFilters, 
  clearFilters, 
  sortProducts
} = filtersSlice.actions; 

export default filtersSlice.reducer
