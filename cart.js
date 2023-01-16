
    // Initialize the shopping cart data structure
    let shoppingCart = [];

  // Attach the event listener to the "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
      // Get the item name, price, and quantity from the page
      let name = this.parentElement.querySelector("h3").textContent;
      let price = this.parentElement.querySelector(".price").textContent;
      let quantity = 1; // Set the default quantity to 1
      // Call the addToCart function with the item information
      addToCart(name, price, quantity);
    });
  }); 
  
  // Define a function to handle the "Add to Cart" event
function addToCart(name, price, quantity) {
  // Remove the currency symbol from the price string
  let numericPrice = price.replace("$", "");
  // Convert the numeric price string to a number
  let numberPrice = parseFloat(numericPrice);
  // Check if an item with the same name already exists in the shopping cart
  let existingItem = shoppingCart.find(item => item.name === name);
  if (existingItem) {
    // If an item with the same name exists, update its quantity and total price
    existingItem.quantity += quantity;
    existingItem.totalPrice = numberPrice * existingItem.quantity;
  } else {
    // If an item with the same name does not exist, add a new item to the shopping cart
    shoppingCart.push({ name: name, price: numberPrice, quantity: quantity, totalPrice: numberPrice * quantity });
  }
  // Update the display of the shopping cart
  updateCartDisplay();
}


// Define a function to handle the "Delete" button click event
function deleteFromCart(event) {
  // Get the name of the item to be deleted
  let name = event.target.parentElement.parentElement.querySelector("td:first-child").textContent;
  // Find the item in the shopping cart
  let item = shoppingCart.find(item => item.name === name);
  // Delete the item from the shopping cart
  shoppingCart = shoppingCart.filter(item => item.name !== name);
  // Update the display of the shopping cart
  updateCartDisplay();
}


// Define a function to update the display of the shopping cart
function updateCartDisplay() {
  // Clear the shopping cart table
  document.querySelector("#cart-items").innerHTML = "";
  // Calculate the total number of items in the cart
  let totalQuantity = shoppingCart.reduce((total, item) => total + item.quantity, 0);
  // Update the display of the total quantity
  document.querySelector(".cart-quantity").innerHTML = totalQuantity;
  // Calculate the total cost of the items in the cart
  let totalCost = shoppingCart.reduce((total, item) => total + item.totalPrice, 0);
  // Update the display of the total cost
  document.querySelector(".cart-total").innerHTML = totalCost;
  // Add rows for the items in the cart
  shoppingCart.forEach(item => {
    let row = document.createElement("tr");
    // Add a "Delete" button to the row
    row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>${item.totalPrice}</td><td><button class="delete-from-cart">Delete</button></td>`;   
    // Add an event listener to the "Delete" button
    row.querySelector(".delete-from-cart").addEventListener("click", deleteFromCart);
    document.querySelector("#cart-items").appendChild(row);
  });;
}


// Abstract-home
$(function() {

  var $menu_tabs = $('.menu__tabs li a'); 
  $menu_tabs.on('click', function(e) {
  e.preventDefault();
  $menu_tabs.removeClass('active');
  $(this).addClass('active');

  $('.menu__item').fadeOut(300);
  $(this.hash).delay(300).fadeIn();
  });
  });

