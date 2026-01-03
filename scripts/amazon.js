import { cart, addtocart } from "../data/cart.js";

let productsHTML = "";

products.forEach((element) => {
  productsHTML += `
        <div class="product-container">
              <div class="product-image-container">
                <img
                  class="product-image"
                  src="${element.image}"
                />
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${element.name}
              </div>

              <div class="product-rating-container">
                  <img
              class="product-rating-stars"
              src="images/ratings/rating-${element.rating.stars * 10}.png"
            />
                <div class="product-rating-count link-primary">${
                  element.rating.count
                }</div>
              </div>

              <div class="product-price">$${(element.priceCents / 100).toFixed(
                2
              )}</div>

                <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div class="product-spacer"></div>

              <div class="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
              </div>

              <button data-product-id="${
                element.id
              }" class="add-to-cart-button button-primary">Add to Cart</button>
            </div>`;
});

const htmlGrid = document.querySelector(".js-products-grid");
htmlGrid.innerHTML = productsHTML;

function cartQuant() {
  let quantTotal = 0;
  cart.forEach((item) => {
    quantTotal += item.quant;
  });
  // console.log(cart);
  document.querySelector(".js-cart-quant").innerHTML = quantTotal;
}

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productID = button.dataset.productId;
    addtocart(productID);
    cartQuant();
  });
});
