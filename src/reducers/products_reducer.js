import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  const {type, payload} = action; 
  switch (type) {
    case SIDEBAR_OPEN: 
      return {
        ...state, 
        isSidebarOpen: true
      }
    
    case SIDEBAR_CLOSE: 
      return {
        ...state, 
        isSidebarOpen: false
      }
    
    case GET_PRODUCTS_BEGIN: 
      return {
        ...state,
        products_loading: true,
      };
    
    case GET_PRODUCTS_SUCCESS:
      const featuredProducts = payload.filter(product =>
          product.featured === true)
      return {
        ...state,
        products: payload,
        featured_products: featuredProducts, 
        products_loading: false,
      };
    
    case GET_PRODUCTS_ERROR: 
      return {
        ...state,
        products_loading: false,
        products_error: true,
      };
    
    default: 
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default products_reducer
