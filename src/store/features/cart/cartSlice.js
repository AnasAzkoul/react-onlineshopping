import {createSlice} from '@reduxjs/toolkit';
import {
  handleAddToCart,
  handleToggleAmount,
  handleRemoveItem,
  handleCalculateTotals,
} from './cartActions';

const initialState = {
  cart: [], // todo: persist cart value to localStorage;
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      handleAddToCart(state, payload); 
    },
    clearCart: (state) => {
      state.cart = []
    }, 
    toggleAmount: (state, {payload}) => {
      handleToggleAmount(state, payload); 
    }, 
    removeItem: (state, {payload}) => {
      handleRemoveItem(state, payload); 
    }, 
    calculateTotals: (state) => {
      handleCalculateTotals(state)
    }
  },
});


export const {
  addToCart,
  clearCart,
  toggleAmount,
  removeItem,
  calculateTotals
} = cartSlice.actions; 

export default cartSlice.reducer;
