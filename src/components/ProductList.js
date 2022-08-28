import React, {useEffect} from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import {useSelector, useDispatch} from 'react-redux';
import { sortProducts, SortProducts } from '../store/features/filters/filtersSlice';

const ProductList = () => {
  const dispatch = useDispatch()
  const {
    filtered_products: products,
    all_products,
    sort,
    filters
  } = useSelector((store) => store.filters); 
  
  useEffect(() => {
    dispatch(sortProducts())
  }, [all_products, sort, filters])
  
  const {
    grid_view
  } = useFilterContext(); 
  
  if (products.length < 1) {
    return <h5 style={{textTransform: 'none'}}>
      Sorry, no products matched your search
    </h5>
  }
  
  if (grid_view === false) {
    return <ListView products={products} />
  }
  
  
  return <GridView products={products}></GridView>
}

export default ProductList
