import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import {Link} from 'react-router-dom'
// RTK
import { useSelector } from 'react-redux'

const CheckoutPage = () => {
  const {cart} = useSelector(store => store.cart)
  return (
    <main>
      <PageHero title='Checkout' />
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>your card is empty</h2>
            <Link to='/products' className='btn'>
              Fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
        
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
  .empty{
    text-align: center;
  }


`
export default CheckoutPage
