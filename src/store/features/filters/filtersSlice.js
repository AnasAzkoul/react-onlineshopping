import {createSlice} from '@reduxjs/toolkit'; 
import {getProducts} from '../../productsThunk';

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
    updateSort: (state, {payload}) => {
      state.sort = payload
    }, 
    SortProducts: (state) => {
      const {sort} = state; 
      let tempProducts = [...state.filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort(
          (a, b) => a.price - b.price
        );
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort(
          (a, b) => b.price - a.price
        );
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      
      state.filtered_products = tempProducts; 
    }, 
    updateFilters: (state, {payload}) => {
      const name = payload.e.target.name
      let value = null
      if (name === 'text'
        || name === 'company'
        || name === 'price'
      ) {
        value = payload.e.target.value;
      }
      if (name === 'category') {
        value = payload.e.target.innerText;         
      }
      if (name === 'color') {
        value = payload.e.target.dataset.color
      }
      if (name === 'shipping') {
        value = payload.e.target.checked 
      }
      state.filters[name] = value
    }, 
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price, 
        shipping: false
      };
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.all_products_loading = true
    }, 
    [getProducts.fulfilled]: (state, {payload}) => {
      state.all_products_loading = false;
      state.all_products = payload; 
      state.filtered_products = payload; 
      state.featured_products = payload.filter(item => item.featured === true); 
      const maxPrice = payload.map(item => item.price)
      state.filters.max_price = Math.max(...maxPrice); 
      state.filters.price = Math.max(...maxPrice);
    }, 
    [getProducts.rejected]: (state) => {
      state.all_products_loading = false; 
      state.all_products_error = true; 
    }
  }
});

export const {
  updateSort,
  SortProducts, 
  updateFilters, 
  clearFilters, 
} = filtersSlice.actions; 

export default filtersSlice.reducer
