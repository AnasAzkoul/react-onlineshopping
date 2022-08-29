import {createSlice} from '@reduxjs/toolkit'; 

const initialState = {
  cart: [],
  total_number: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const cartSlice = createSlice({
  name: 'cart', 
  initialState, 
  reducers: {
    addToCart: (state, {payload}) => {
      const {id, color, amount, product} = payload; 
      const productToAdd = state.cart.find(item => item.id === id + color); 
      if (productToAdd) {
        let tempCart = state.cart.map(item => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount; 
            if (newAmount > product.max) {
              newAmount = product.max
            }
            return {...item, amount: newAmount}
          } else {
            return item
          }
        })
        state.cart = tempCart
      } else {
        const newItem = {
          id: id + color, 
          name: product.name, 
          amount, 
          color, 
          image: product.images[0].url, 
          price: product.price, 
          max: product.stock
        }
        state.cart.push(newItem); 
      }
    }, 
    removeProductFromCart: (state, {payload}) => {
      state.cart = state.cart.filter((item) => item.id !== payload.id); 
    }, 
    toggleAmount: (state, {payload}) => {
      state.cart = state.cart.map(item => {
        if (item.id === payload.id) {
          let newAmount = item.amount
          if (payload.value === 'inc') {
            newAmount += 1; 
            if (newAmount > item.max) {
              newAmount = item.max
            }
          }
          if (payload.value === 'dec') {
            newAmount -= 1; 
            if (newAmount < 1) {
              newAmount = 1
            }
          }
          return {...item, amount: newAmount}
        } else {
          return item
        }
      })
    }, 
    clearCart: (state) => {
      state.cart = []
    }, 
    calculateTotals: (state) => {
      const {totalAmount, totalNumber} = state.cart.reduce((total, item) => {
        total.totalNumber += item.amount; 
        total.totalAmount += item.price * item.amount
        return total 
      }, {totalAmount: 0, totalNumber: 0})
      state.total_number = totalNumber; 
      state.total_amount = totalAmount;
    }
  }
})

export const {
  addToCart,
  removeProductFromCart,
  toggleAmount,
  calculateTotals, 
  clearCart, 
} = cartSlice.actions; 

export default cartSlice.reducer 
