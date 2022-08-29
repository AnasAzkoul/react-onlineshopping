import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  all_products: [],
  filtered_products: [],
  sort: 'price-lowest',
  grid_view: false, 
  filters: {
    min_price: 0,
    max_price: 0,
    price: 0,
    text: '',
    category: 'all',
    color: 'all',
    company: 'all',
    free_shipping: false,
  },
};

const filtersSlice = createSlice({
  name: 'filters', 
  initialState, 
  reducers: {
    loadProducts: (state, {payload}) => {
      const {products} = payload
      let maxPrice = products.length > 0 ?
        (products.reduce((total, item) =>
        item.price > total ? total = item.price : total, 0
      )) : 0
      state.all_products = payload.products
      state.filtered_products = payload.products
      state.filters.max_price = maxPrice
      state.filters.price = state.filters.max_price;
    }, 
    updateSort: (state, {payload}) => {
      state.sort = payload.value
    }, 
    sortProducts: (state) => {
      let tempProducts = [...state.filtered_products]; 
      if (state.sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price); 
      }
      if (state.sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price); 
      }
      if (state.sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      }
      if (state.sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => 
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        )
      }
      state.filtered_products = tempProducts
    }, 
    setGridView: (state) => {
      state.grid_view = true; 
    }, 
    setListView: (state) => {
      state.grid_view = false
    }, 
    updateFilters: (state, {payload}) => {   
      let value = null
      const name = payload.e.target.name
      if (
        name === 'text' ||
        name === 'company' ||
        name === 'price'
      ) {
        value = payload.e.target.value; 
      }
      if (name === 'category') {
        value = payload.e.target.innerText
      }
      if (name === 'color') {
        value = payload.e.target.dataset.color
      } 
      if (name === 'free_shipping') {
        value = payload.e.target.checked;
      }
      state.filters[name] = value
    }, 
    clearFilters: (state) => {
      state.filters = {
        ...initialState.filters,
        free_shipping: false, 
        max_price: state.filters.max_price,
        price: state.filters.max_price,
      };
    }, 
    filterProducts: (state) => {
      let tempProducts = [...state.all_products]
      const {
        text,
        category,
        company,
        color,
        price,
        free_shipping
      } = state.filters; 
      
      if (text) {
        tempProducts = tempProducts.filter(item =>
          item.name.toLowerCase().includes(text)
        ); 
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(item =>
          item.category.toLowerCase() === category.toLowerCase()
        ); 
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(item =>
          item.company.toLowerCase() === company.toLowerCase()
        ); 
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter(item =>
          item.colors.includes(color)
        )
      }
      if (free_shipping) {
        tempProducts = tempProducts.filter(item => item.shipping === true)
      }
      tempProducts = tempProducts.filter((item) => item.price <= price); 
      state.filtered_products = tempProducts; 
    }
  }
})

export const {
  loadProducts,
  updateSort,
  sortProducts,
  setGridView, 
  setListView, 
  updateFilters, 
  clearFilters, 
  filterProducts, 
} = filtersSlice.actions; 

export default filtersSlice.reducer
