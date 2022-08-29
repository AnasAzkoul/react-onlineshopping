import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Navbar, Sidebar, Footer} from './components'; 
import {
  HomePage,
  AboutPage,
  ErrorPage,
  CartPage,
  ProductsPage,
  SingleProductPage,
  CheckoutPage,
  PrivateRoute,
  AuthWrapper,
} from './pages'; 
// RTK
import {useDispatch, useSelector} from 'react-redux'
import {getProducts} from './Store/features/ProductsSlice/ProductsSlice'; 
import {loadProducts, sortProducts, filterProducts} from './Store/features/filters/filtersSlice'; 

function App () {
  const dispatch = useDispatch(); 
  const {products} = useSelector((store) => store.products)
  const {
    filtered_products,
    all_products,
    sort, 
    filters
  } = useSelector(store => store.filters)
  
  // console.log(free_shipping);
  
  useEffect(() => {
    dispatch(getProducts())
  }, [])
  
  useEffect(() => {
    dispatch(loadProducts({products})); 
  }, [products])
  
  useEffect(() => {
    dispatch(sortProducts()); 
  }, [sort])
  
  useEffect(() => {
    dispatch(filterProducts());
  }, [filters, products]);
  
  
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<SingleProductPage />} />
          <Route
            path='/checkout'
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>}
          />
          <Route path='/*' element={<ErrorPage />} />          
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App
