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
    }
  }
})

export const {addToCart} = cartSlice.actions; 
export default cartSlice.reducer 
