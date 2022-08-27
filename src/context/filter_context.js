import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import {useProductsContext} from './products_context'; 


// functions to be executed in the filter reducer 
// /////////////////////////////////////////////////////////////

// filtering products in the reducer function 
export const handleFilterProducts = state => {
  const { all_products } = state;
  const { text, category, company, price, shipping, color } =
    state.filters;
  let tempProducts = [...all_products];
  if (text) {
    tempProducts = tempProducts.filter((product) =>
      product.name.toLowerCase().includes(text)
    );
  }
  if (category !== 'all') {
    tempProducts = tempProducts.filter(
      (product) => product.category.toLowerCase() === category
    );
  }
  if (company !== 'all') {
    tempProducts = tempProducts.filter(
      (product) => product.company.toLowerCase() === company
    );
  }
  if (color !== 'all') {
    tempProducts = tempProducts.filter((product) =>
      product.colors.includes(color)
    );
  }
  // filtering price
  tempProducts = tempProducts.filter(
    (product) => product.price <= price
  );
  if (shipping) {
    tempProducts = tempProducts.filter(
      (product) => product.shipping === true
    );
  }
  return tempProducts; 
}
// ####################################################################
// sorting products in the reducer function / exported to filter_reducer 
export const handleSortProducts = state => {
  const { filtered_products, sort } = state;
  let tempProducts = [...filtered_products];
  if (sort === 'price-lowest') {
    tempProducts = tempProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === 'price-highest') {
    tempProducts = tempProducts.sort((a, b) => b.price - a.price);
  }
  if (sort === 'name-a') {
    tempProducts = tempProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
  if (sort === 'name-z') {
    tempProducts = tempProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }
  return tempProducts; 
}

// /////////////////////////////////////////////////////////////

const initialState = {
  filtered_products: [],
  all_products: [],
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
  }
};

const FilterContext = React.createContext()

export const FilterProvider = ({children}) => {
  const {products} = useProductsContext(); 
  const [state, dispatch] = useReducer(reducer, initialState); 
  
  useEffect(() => {
    dispatch({type: LOAD_PRODUCTS, payload: products});
  }, [products])
  
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS }); 
    dispatch({type: SORT_PRODUCTS});    
  }, [products, state.sort, state.filters]); 
  
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }
  
  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }
  
  const updateSort = (e) => {
    const value = e.target.value; 
    dispatch({type: UPDATE_SORT, payload: value})
  }
  
  const updateFilters = (e) => {
    const name = e.target.name; 
    let value = e.target.value; 
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'color') {
      value = e.target.dataset.color
    }
    if (name === 'price') {
      value = Number(value); 
    }
    if (name === 'shipping') {
      value = e.target.checked
      console.log(e.target.indeterminate);
    }
    dispatch({
      type: UPDATE_FILTERS,
      payload: {...state.filters, [name]: value}
    })
  }; 
  
  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }; 
  
  

  
  const value = {
    ...state, 
    setGridView, 
    setListView, 
    updateSort, 
    dispatch, 
    updateFilters, 
    clearFilters, 
  }
  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
