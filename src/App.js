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
import { useAuth0 } from '@auth0/auth0-react';
// RTK
import {useDispatch, useSelector} from 'react-redux'
import {getProducts} from './Store/features/ProductsSlice/ProductsSlice'; 
import {loadProducts, sortProducts, filterProducts} from './Store/features/filters/filtersSlice'; 
import {setUser} from './Store/features/User/userSlice'; 

function App () {
  const dispatch = useDispatch(); 
  const {products} = useSelector((store) => store.products)
  const {
    filtered_products,
    all_products,
    sort, 
    filters
  } = useSelector(store => store.filters)
  
  const {user} = useAuth0(); 
  
  useEffect(() => {
    dispatch(setUser(user))
  }, [dispatch, user])
  
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(loadProducts({products})); 
  }, [products, dispatch])
  
  useEffect(() => {
    dispatch(sortProducts()); 
  }, [sort, dispatch])
  
  useEffect(() => {
    dispatch(filterProducts());
  }, [filters, products, dispatch]);
  
  
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
