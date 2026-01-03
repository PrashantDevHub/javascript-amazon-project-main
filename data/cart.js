export const cart = [];
export function addtocart(productID) {
  let matchingItem = true;
  cart.forEach((item) => {
    if (productID == item.ID) {
      item.quant += 1;
      matchingItem = false;
    }
  });
  if (matchingItem) {
    cart.push({ ID: productID, quant: 1 });
  }
}
