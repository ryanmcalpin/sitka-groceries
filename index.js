const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var displayMainMenu = function () {
  rl.question('Choose an option below.\n1) Shop\n2) View cart\n3) Checkout\n4) Exit\nYour choice: ', (answer) => {
    switch(answer) {
      case "1":
        displayShopMenu();
        break;
      case "2":
        displayCart();
        break;
      case "3":
        displayCheckoutMenu();
        break;
      case "4":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option!");
        displayMainMenu();
    }
  });
}

var displayShopMenu = function () {
  console.log("shop works!");
}

var displayCart = function () {
  console.log("cart works!");
}

var displayCheckoutMenu = function () {
  console.log("checkout works!");
}


// front-end
console.log('Welcome to Sitka Groceries!');
displayMainMenu();
