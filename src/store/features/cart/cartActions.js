export const handleAddToCart = (state, payload) => {
  const { id, amount, color, product } = payload;
  const itemToAdd = state.cart.find((item) => item.id === id);
  if (itemToAdd) {
    const tempCart = state.cart.map((item) => {
      if (item.id === id + color) {
        let newAmount = item.amount + amount;
        if (newAmount > item.max) {
          newAmount = item.max;
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    state.cart = tempCart;
  } else {
    const newItemToAdd = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.images[0].url,
      price: product.price,
      max: product.stock,
    };
    state.cart = [...state.cart, newItemToAdd];
  }
}
// ////////////////////////////////////////////////////////
export const handleToggleAmount = (state, payload) => {
  const {value, id} = payload; 
  const tempCart = state.cart.map(item => {
    if (item.id === id) {
      let newAmount = item.amount 
      if (value === 'inc') {
        newAmount += 1
        if (newAmount > item.max) {
          newAmount = item.max
        }
      }
      if (value === 'dec') {
        newAmount -= 1
        if (newAmount < 1) {
          newAmount = 1
        }
      }
      return {...item, amount: newAmount}
    } else {
      return item 
    }
  })
  state.cart = tempCart; 
}
// ////////////////////////////////////////////////////////
export const handleRemoveItem = (state, payload) => {
  state.cart = state.cart.filter(item => item.id !== payload.id)
}
// ////////////////////////////////////////////////////////
export const handleCalculateTotals = (state) => {
  const {totalAmount, totalPrice} = state.cart.reduce((total, item) => {
    total.totalAmount += item.amount; 
    total.totalPrice += item.amount * item.price; 
    return total
  }, {totalAmount: 0, totalPrice: 0})
  state.total_amount = totalPrice
  state.total_items = totalAmount
}
// ////////////////////////////////////////////////////////
