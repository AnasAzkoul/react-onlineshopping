import {createSlice} from '@reduxjs/toolkit'; 



const initialState = {
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
    
  },

});



export default filtersSlice.reducer
