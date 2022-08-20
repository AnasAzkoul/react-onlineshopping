export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number / 100); 
}

// export const getUniqueValues = (products, value) => {
//   let valueObj = {}; 
  
//   products.forEach(product => {
//     const category = product[value];
//     if (!value.includes('colors')) {
//       if (valueObj[category]) {
//         valueObj[category] += 1;
//       } else {
//         valueObj[category] = 1;
//       }
//     } else {
//       category.forEach(item => {
//         if (valueObj[item]) {
//           valueObj[item] += 1
//         } else {
//           valueObj[item] = 1
//         }
//       })    
//     }
//   })
//   return ['all', ...Object.keys(valueObj)]; 
// }

export const getUniqueValues = (products, value) => {
  let unique = products.map(product => product[value]); 
  if (value === 'colors') {
    unique = unique.flat()
  }
  
  return ['all', ...new Set(unique)]; 
};
