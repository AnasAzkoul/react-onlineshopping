import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'


// get the cart  content from local storage and and set it as the initial value for the cart 
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(), 
  total_items: 0, 
  total_amount: 0, 
  shipping_fee: 534, 
}

const CartContext = React.createContext()

export const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState); 
  

  
  // add product to cart 
  const addToCart = (id, amount, color, product) => {
    let tempItem = state.cart.find(item => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map(cartItem => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount; 
          if (newAmount.amount > cartItem.max) {
            newAmount = cartItem.max
          }
          return {...cartItem, amount: newAmount}
        } else {
          return cartItem 
        }      
      })
      dispatch({type: ADD_TO_CART, payload: tempCart})
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return dispatch({type: ADD_TO_CART, payload: [...state.cart, newItem]})
    }
  }
  
  // remove product from cart 
  const removeItem = (id) => {
    const tempCart = state.cart.filter(cartItem => cartItem.id !== id); 
    dispatch({type: REMOVE_CART_ITEM, payload: tempCart})
  }
  // increase / decrease the amount fo a product in the cart 
  const toggleAmount = (id, value) => {
    let tempCart = state.cart.map(cartItem => {
      let newAmount = cartItem.amount; 
      if (cartItem.id === id) {
        if (value === 'inc') {
          newAmount = newAmount + 1
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }          
        }
        if (value === 'dec') {
          newAmount = newAmount - 1; 
          if (newAmount < 1) {
            newAmount = 0
          }          
        }
      } else {
        return cartItem
      }
      return { ...cartItem, amount: newAmount };
    })
    .filter(cartItem => cartItem.amount !== 0)
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: tempCart})
  }
  
  // clear all the products in the cart 
  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }
  // total amount and total items
  const calcTotals = () => {
    const totalItems = state.cart.reduce((total, item) => {
      total = total + item.amount
      return total
    }, 0)
    const totalAmount = state.cart.reduce((total, item) => {
      const totalAmountForItem = item.price * item.amount
      // console.log(totalAmountForItem);
      total = total + totalAmountForItem
      // console.log(total);
      return total 
    }, 0)
    dispatch({type:COUNT_CART_TOTALS, payload: {totalItems, totalAmount}})
  }
  
  
  
  useEffect(() => {
    calcTotals()
  // persisting the cart content in local storage 
  localStorage.setItem('cart', JSON.stringify(state.cart));
}, [state.cart]);
  
  
  const value = {
    ...state, 
    addToCart, 
    removeItem, 
    toggleAmount, 
    clearCart, 
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
