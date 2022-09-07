import React from 'react'
import styled from 'styled-components'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import {FaCheck} from 'react-icons/fa'; 
// RTK
import {useSelector, useDispatch} from 'react-redux';
import { updateFilters, clearFilters } from '../Store/features/filters/filtersSlice';

const Filters = () => {
  const dispatch = useDispatch()
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      max_price,
      price,
      free_shipping
    },
    all_products
  } = useSelector(store => store.filters); 
  
  const categories = getUniqueValues(all_products, 'category'); 
  const companies = getUniqueValues(all_products, 'company'); 
  const colors = getUniqueValues(all_products, 'colors'); 
  
  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={(e) => dispatch(updateFilters({ e }))}
            />
          </div>
          {/* end of search input */}
          {/* Categories */}
          <div className='form-control'>
            <h5>categories</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => dispatch(updateFilters({ e }))}
                    name='category'
                    type='button'
                    className={`${
                      category.toLowerCase() === c.toLowerCase() && 'active'
                    }
                  `}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* End of Categories */}
          {/* companies */}
          <div className='form-control'>
            <h5>Company</h5>
            <select
              name='company'
              id='company'
              value={company}
              className='company'
              onChange={(e) => dispatch(updateFilters({ e }))}
            >
              {companies.map((comp, index) => {
                return (
                  <option value={comp} key={index}>
                    {comp}
                  </option>
                );
              })}
            </select>
          </div>
          {/* End of Companies */}
          {/* Colors */}
          <div className='form-control'>
            <h5>Colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name='color'
                      onClick={(e) => dispatch(updateFilters({ e }))}
                      data-color='all'
                      className={`all-btn ${color === 'all' && 'active'}`}
                    >
                      {c}
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name='color'
                    style={{ backgroundColor: c }}
                    className={`color-btn ${color === c && 'active'}`}
                    data-color={c}
                    onClick={(e) => dispatch(updateFilters({ e }))}
                  >
                    {color === c && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>
          {/* End of Colors */}
          {/* price */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={max_price}
              value={price}
              onChange={(e) => dispatch(updateFilters({ e }))}
            />
          </div>
          {/* End of Price */}
          {/* free shipping */}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='free_shipping'
              id='shipping'
              onChange={(e) => dispatch(updateFilters({ e }))}
              checked={free_shipping}
            />
          </div>
          {/* End of Free Shipping */}
        </form>
        <button
          type='button'
          className='clear-btn'
          onClick={() => dispatch(clearFilters())}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
