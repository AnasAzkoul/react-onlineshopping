import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

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
        filters: {...state.filters, max_price: maxPrice}
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
      const {filtered_products, sort} = state; 
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name));
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => 
        b.name.localeCompare(a.name));
      }
      return {
        ...state, 
        filtered_products: tempProducts
      }
    
    case UPDATE_FILTERS: 
      return {
        ...state, 
        filters: payload
      }
    
    case FILTER_PRODUCTS: 
      return {
        ...state,
        
      }
    
    default: 
      throw new Error(`No Matching "${type}" - action type`);
  }  
}

export default filter_reducer
