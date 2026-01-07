import { cart, removeProduct, storeCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { delivery } from "../utils/deliveryOption.js";

let carthtml = "";

cart.forEach((cartItem) => {
  const productID = cartItem.ID;
  let matchingProduct;

  products.forEach((product) => {
    if (productID === product.id) {
      matchingProduct = product;
    } else return;
  });

  let mathingIdProduct = [];
  delivery.forEach((item) => {
    if (cartItem.deliveryOptionId === item.id) {
      mathingIdProduct = item;
    }
  });
  const today = dayjs();
  const deliveryDate = today
    .add(mathingIdProduct.deliverydays, "days")
    .format("dddd,MMMM D");

  carthtml += `<div class="cart-item-container js-product-delete-${
    matchingProduct.id
  }">
            <div class="delivery-date">Delivery date: ${deliveryDate}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quant
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>  
                ${delioption(matchingProduct, cartItem)}            
              </div>
            </div>
          </div>`;
});

function delioption(matchingProduct, cartItem) {
  let html = "";
  delivery.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today
      .add(option.deliverydays, "days")
      .format("dddd,MMMM D");
    const priceString =
      option.priceCents === 0
        ? "Free"
        : `$${formatCurrency(option.priceCents)}`;

    const Ischecked = option.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option">
        <input
          type="radio"
          ${Ischecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${deliveryDate}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>`;
  });

  return html;
}

const cartGrid = document.querySelector(".order-summary");
cartGrid.innerHTML = carthtml;

document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productID = link.dataset.productId;
    removeProduct(productID);
    let container = document.querySelector(`.js-product-delete-${productID}`);
    container.remove();
  });
});
