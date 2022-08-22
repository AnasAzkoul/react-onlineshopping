import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'; 

import {
  handleFilterProducts,
  handleSortProducts,
} from '../context/filter_context'; 

const filter_reducer = (state, action) => {
  const {type, payload} = action; 
  switch (type) {
    case LOAD_PRODUCTS: 
    const maxPrice = payload.reduce(
      (total, product) =>
        product.price > total ? (total = product.price) : total,
      0
    );
      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
        filters: {...state.filters, max_price: maxPrice, price: maxPrice}
      };
    
    case SET_GRIDVIEW: 
      return {
        ...state, 
        grid_view: true
      }
    
    case SET_LISTVIEW: 
      return {
        ...state, 
        grid_view: false
      }
    
    case UPDATE_SORT: 
      return {
        ...state, 
        sort: payload
      }
    
    case SORT_PRODUCTS:
      const sortedTempProducts = handleSortProducts(state); 
      return {
        ...state, 
        filtered_products: sortedTempProducts
      }
    
    case UPDATE_FILTERS: 
      return {
        ...state, 
        filters: payload
      }
    
    case FILTER_PRODUCTS: 
      const filteredTempProducts = handleFilterProducts(state); 
      
      return {
        ...state,
        filtered_products: filteredTempProducts,   
      }
    
    case CLEAR_FILTERS: 
      return {
        ...state,
        filters: {
          ...state.filters, 
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    
    default: 
      throw new Error(`No Matching "${type}" - action type`);
  }  
}

export default filter_reducer
