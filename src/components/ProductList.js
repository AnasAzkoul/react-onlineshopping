import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import { useSelector } from 'react-redux'

const ProductList = () => {
  const {filtered_products: products} = useSelector((store) => store.products); 
  
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
