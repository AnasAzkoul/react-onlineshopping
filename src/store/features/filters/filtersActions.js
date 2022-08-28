// update the sort state 
export const handleUpdateSort = (state, action) => {
  state.sort = action.payload
}
// ///////////////////////////////////////////////////////////////////
// sorting products 
export const handleSortProducts = (state) => {
  const { sort } = state;
  let tempProducts = [...state.filtered_products];
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

  state.filtered_products = tempProducts;
}
// ///////////////////////////////////////////////////////////////////
// update the filters state 
export const handleUpdateFilters = (state, payload) => {
  const name = payload.e.target.name;
  let value = null;
  if (name === 'text' || name === 'company' || name === 'price') {
    value = payload.e.target.value;
  }
  if (name === 'category') {
    value = payload.e.target.innerText;
  }
  if (name === 'color') {
    value = payload.e.target.dataset.color;
  }
  if (name === 'shipping') {
    value = payload.e.target.checked;
  }
  state.filters[name] = value;
}
// ///////////////////////////////////////////////////////////////////
export const handleFilterProducts = (state) => {
  const { text, category, company, color, price, shipping } =
    state.filters;
  let tempProducts = [...state.all_products];
  if (text) {
    tempProducts = tempProducts.filter((item) =>
      item.name.toLowerCase().includes(text)
    );
  }
  if (category.toLowerCase() !== 'all') {
    tempProducts = tempProducts.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (company.toLowerCase() !== 'all') {
    tempProducts = tempProducts.filter(
      (item) => item.company.toLowerCase() === company.toLowerCase()
    );
  }
  if (color !== 'all') {
    tempProducts = tempProducts.filter((item) =>
      item.colors.includes(color)
    );
  }
  // filter price
  tempProducts = tempProducts.filter((item) => item.price <= price);
  // filter shipping
  if (shipping) {
    tempProducts = tempProducts.filter((item) => item.shipping === true);
  }

  state.filtered_products = tempProducts; 
}
// ///////////////////////////////////////////////////////////////////
// clear all filters
export const handleClearFilters = (state) => {
  state.filters = {
    ...state.filters,
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    price: state.filters.max_price,
    shipping: false,
  };
}
// ///////////////////////////////////////////////////////////////////
// updating the state after fetching the products collection from the api
export const loadProducts = (state, payload) => {
  const maxPrice = payload.map((item) => item.price);
  state.all_products_loading = false;
  state.all_products = payload;
  state.filtered_products = payload;
  state.featured_products = payload.filter(
    (item) => item.featured === true
  );
  state.filters.max_price = Math.max(...maxPrice);
  state.filters.price = Math.max(...maxPrice);
}
// //////////////////////////////////////////////////////////////////
