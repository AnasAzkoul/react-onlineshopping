import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  const {type, payload} = action; 
     
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state, 
        cart: payload 
      };
    
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: payload
      };
    
    case TOGGLE_CART_ITEM_AMOUNT:
      return {
        ...state, 
        cart: payload
      };
    
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      }; 
    
    case COUNT_CART_TOTALS: 
      return {
        ...state,
        total_items: payload.totalItems,
        total_amount: payload.totalAmount,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
}

export default cart_reducer
