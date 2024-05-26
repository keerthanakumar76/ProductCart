const productsList = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

const productmain = document.getElementById('product-list');
const cartmain = document.getElementById('cart-items');
const noCartMessage = document.getElementById('noproduct-message');
const totalPriceElement = document.getElementById('total-price');

let cart = {};

function renderProducts() {
  productsList.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      
      const productName = document.createElement('div');
      productName.classList.add('product-name');
      productName.textContent = product.name;
      
      const productPrice = document.createElement('div');
      productPrice.classList.add('product-price');
      productPrice.textContent = `Cost: Rs.${product.price}`;
      
      const productButtons = document.createElement('div');
      productButtons.classList.add('product-controls');
      
      const removeButton = document.createElement('button');
      removeButton.textContent = '-';
      removeButton.addEventListener('click', () => removeFromCart(product));
      
      const qualityCheck = document.createElement('span');
      qualityCheck.textContent = cart[product.id] || 0;
      
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.addEventListener('click', () => addToCart(product));
      
      productButtons.appendChild(removeButton);
      productButtons.appendChild(qualityCheck);
      productButtons.appendChild(addButton);
      
      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(productButtons);
      
      productmain.appendChild(productDiv);
  });
}

function addToCart(product) {
  if (!cart[product.id]) {
      cart[product.id] = 0;
  }
  cart[product.id]++;
  renderCart();
  updateProductQuantity(product);
}

function removeFromCart(product) {
  if (cart[product.id]) {
      cart[product.id]--;
      if (cart[product.id] === 0) {
          delete cart[product.id];
      }
      renderCart();
      updateProductQuantity(product);
  }
}

function updateProductQuantity(product) {
  const productDivs = document.querySelectorAll('.product');
  productDivs.forEach(productDiv => {
      if (productDiv.querySelector('.product-name').textContent === product.name) {
          productDiv.querySelector('.product-controls span').textContent = cart[product.id] || 0;
      }
  });
}

function renderCart() {
  cartmain.innerHTML = '';
  const cartItems = Object.keys(cart);
  if (cartItems.length === 0) {
      noCartMessage.style.display = 'block';
  } else {
      noCartMessage.style.display = 'none';
      cartItems.forEach(productId => {
          const product = productsList.find(product => product.id == productId);
          const cartProductSection = document.createElement('div');
          cartProductSection.classList.add('cart-product');
          cartProductSection.style.display = "flex";
          cartProductSection.style.justifyContent = "space-between";
          
          const productName = document.createElement('div');
          productName.textContent = product.name;
          
          const productTotal = document.createElement('div');
          productTotal.textContent = `${cart[productId]} x ${product.price}`;
          
          cartProductSection.appendChild(productName);
          cartProductSection.appendChild(productTotal);
          cartmain.appendChild(cartProductSection);
      });
  }
  updateTotalPrice();
}

function updateTotalPrice() {
  const totalPrice = Object.keys(cart).reduce((total, productId) => {
      const product = productsList.find(product => product.id == productId);
      return total + (cart[productId] * product.price);
  }, 0);
  totalPriceElement.textContent = totalPrice;
}

renderProducts();