const readline = require('readline');

function GroceryItem(name, unitSingular, unitPlural, quantity, pricePerUnit) {
  this.name = name;
  this.unitSingular = unitSingular;
  this.unitPlural = unitPlural;
  this.quantity = quantity;
  this.pricePerUnit = pricePerUnit;
}
var bananas = new GroceryItem("Bananas", "bunch", "bunches", 0, 2.19);
var coffee = new GroceryItem("Coffee", "pound", "pounds", 0, 5.99);
var tea = new GroceryItem("Tea", "box", "boxes", 0, 4.35);
var groceryItems = [bananas, coffee, tea];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var displayMainMenu = function () {
  rl.question('Choose an option below.\n1) Shop\n2) View cart\n3) Checkout\n4) Exit\n', (answer) => {
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
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid option!');
        displayMainMenu();
    }
  });
}

var displayShopMenu = function () {
  console.log('Choose an item to view details and options.');
  rl.question('1) Bananas\n2) Coffee\n3) Tea\n4) Go back\n', (answer) => {
    switch (answer) {
      case "1":
        displayItemDetailMenu(parseInt(answer) - 1);
        break;
      case "2":
        displayItemDetailMenu(parseInt(answer) - 1);
        break;
      case "3":
        displayItemDetailMenu(parseInt(answer) - 1);
        break;
      case "4":
          displayMainMenu();
        break;
      default:
        console.log('Invalid option!');
        displayShopMenu();
    }
  })
}

var displayItemDetailMenu = function (i) {
  var item = groceryItems[i];
  var another = '1';
  if (item.quantity != 0) {
    another = 'another';
  }
  var unitProper;
  if (item.quantity == 1) {
    unitProper = item.unitSingular;
  } else {
    unitProper = item.unitPlural;
  }
  console.log(item.name + '\n$' + item.pricePerUnit + ' / ' + item.unitSingular);
  console.log('You currently have ' + item.quantity + ' ' + unitProper + ' of ' + item.name + ' in your cart.');
  rl.question('Would you like to add ' + another + ' ' + item.unitSingular + ' of ' + item.name + ' to your cart?\n1) Add ' + item.unitSingular + ' to cart\n2) Go back\n', (answer) => {
    switch (answer) {
      case "1":
        console.log(i);
        incrementItem(i);
        displayItemDetailMenu(i);
        break;
      case "2":
        displayShopMenu();
        break;
      default:
        console.log('Invalid option!');
        displayItemDetailMenu(i);
    }
  })
}

var incrementItem = function (i) {
  var item = groceryItems[i];
  groceryItems[i].quantity += 1;
  console.log('1 ' + item.unitSingular + ' of ' + item.name + ' added to cart.');
}

var displayCart = function () {
  console.log('cart works!');
}

var displayCheckoutMenu = function () {
  console.log('checkout works!');
}


// front-end
console.log('Welcome to Sitka Groceries!');
displayMainMenu();
