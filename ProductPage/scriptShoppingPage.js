// Add event listener to the add to cart form
const addToCartForm = document.getElementById('add-to-cart-form');
addToCartForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const quantity = 1;

  // Create a cart item object with necessary details
  const cartItem = {
    productId: '123',
    name: 'LUX Soap',
    quantity: quantity,
    price: 46,
  };

  // Get existing cart items from local storage or start with an empty array
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if the same product already exists in the cart
  const existingItemIndex = cartItems.findIndex(
    (item) => item.productId === cartItem.productId
  );

  // Update the quantity if the same product already exists, otherwise add a new item
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push(cartItem);
  }

  // Update the cart items in local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the UI to display the cart items
  displayCartItems();

  // Reset the form
  addToCartForm.reset();
});

// Function to display the cart items on the page
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountContainer = document.getElementById('total-amount');
  cartItemsContainer.innerHTML = ''; // Clear previous items

  // Get the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  let totalAmount = 0; // Initialize total amount

  cartItems.forEach(function (item, index) {
    const li = document.createElement('li');

    const productName = document.createElement('span');
    productName.textContent = item.name;

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', function () {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        // Remove the item from the cartItems array
        cartItems.splice(index, 1);
      }
      updateCart(cartItems);
    });

    const quantity = document.createElement('span');
    quantity.textContent = item.quantity;

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', function () {
      item.quantity++;
      updateCart(cartItems);
    });

    const amount = document.createElement('span');
    const itemAmount = item.quantity * item.price; // Calculate item amount
    amount.textContent = itemAmount;
    totalAmount += itemAmount; // Add item amount to total amount

    li.appendChild(productName);
    li.appendChild(decreaseButton);
    li.appendChild(quantity);
    li.appendChild(increaseButton);
    li.appendChild(amount);

    cartItemsContainer.appendChild(li);
  });

  totalAmountContainer.textContent = totalAmount; // Display total amount
}
function updateCart(cartItems) {
  // Update the cart items in local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the UI to reflect the changes
  displayCartItems();
}

// Display the cart items when the page loads
displayCartItems();