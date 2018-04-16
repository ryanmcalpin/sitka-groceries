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
  var totalItems = getTotalItemCount();
  rl.question('Choose an option below.\n1) Shop\n2) View cart (' + totalItems + ')\n3) Exit\n', (answer) => {
    switch(answer) {
      case "1":
        displayShopMenu();
        break;
      case "2":
        displayCart();
        break;
      case "3":
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid option!');
        displayMainMenu();
    }
  });
}

// refactor to account for variable groceryItems length
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
  var unitProper = getUnitProper(i);

  console.log(item.name + '\n$' + item.pricePerUnit + ' / ' + item.unitSingular);
  console.log('You currently have ' + item.quantity + ' ' + unitProper + ' of ' + item.name + ' in your cart.');

  // refactor to to allow adding an inputed number of units
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

var displayCart = function () {
  var itemCount = getTotalItemCount();

  if (itemCount == 0) {
    console.log('Your cart is empty.');
    displayMainMenu();
  } else {
    var totalPrice = 0;
    var plural = itemCount == 1 ? '' : 's'
    console.log('Your cart contains the following ' + itemCount + ' item' + plural + ':');
    groceryItems.forEach((item, i) => {
      if (item.quantity > 0) {
        var unitProper = getUnitProper(i);
        var subtotal = (item.quantity * item.pricePerUnit).toFixed(2);
        console.log(item.quantity + ' ' + unitProper + ' of ' + item.name + ', $' + subtotal + ' @ ' + item.pricePerUnit + ' / ' + item.unitSingular);
        totalPrice += parseFloat(subtotal);
        totalPriceFormatted = totalPrice.toFixed(2);
      }
    });
    var priceDisplay = totalPriceFormatted.toString();
    priceDisplay.slice(-2, -1) == '.' ? priceDisplay += '0' : null;

    console.log('Total: $' + priceDisplay);
    rl.question('What would you like to do?\n1) Checkout\n2) Sort by name\n3) Sort by subtotal price\n4) Remove a single item unit\n5) Clear cart\n6) Go back\n', (answer) => {
      switch (answer) {
        case "1":
          displayCheckoutMenu(totalPriceFormatted);
          break;
        case "2":
          console.log("sort!");
          displayCart();
          break;
        case "3":
          console.log("sort!");
          displayCart();
          break;
        case "4":
          removeItemQuery();
          break;
        case "5":
          removeAllItems();
          displayCart();
          break;
        case "6":
          displayMainMenu();
          break;
        default:
        console.log('Invalid option.');
        displayCart();
      }
    });
  }
}

var removeItemQuery = function () {
  var question = 'Remove which item?\n';
  var currentItems = [];
  var listNumber = 1;
  groceryItems.forEach((item, i) => {
    if (item.quantity > 0) {
      question = question.concat((listNumber) + ') ' + item.name + ' (' + item.quantity + ')\n');
      item.index = i;
      currentItems.push(item);
      listNumber++;
    }
  });
  question += (currentItems.length + 1) + ') Go back\n'
  currentItems.length == 0 ? displayCart() : removeItem(question, currentItems);
}

var removeItem = function (question, items) {
  console.log(items.length);
  rl.question(question, (answer) => {
    if ((parseInt(answer) - 1) == items.length) {
      displayCart();
    } else {
      var item = groceryItems[items[parseInt(answer)-1].index];
      item.quantity -= 1;
      console.log('You now have ' + item.quantity + ' ' + item.name + '.');
      removeItemQuery();
    }
  });
}

var incrementItem = function (i) {
  var item = groceryItems[i];
  groceryItems[i].quantity += 1;
  console.log('1 ' + item.unitSingular + ' of ' + item.name + ' added to cart.');
}

var getTotalItemCount = function () {
  var itemCount = 0;
  groceryItems.forEach((item) => {
    itemCount += item.quantity;
  });
  return itemCount;
}

var getUnitProper = function (i) {
  var item = groceryItems[i];
  var unitProper;
  if (item.quantity == 1) {
    unitProper = item.unitSingular;
  } else {
    unitProper = item.unitPlural;
  }
  return unitProper;
}

var removeAllItems = function () {
  groceryItems.forEach((item, i) => {
    item.quantity = 0;
  });
}

var displayCheckoutMenu = function (total) {
  console.log('Your total is $' + total + '.');
  rl.question('How would you like to pay?\n1) Cash\n2) Credit/debit card\n3) Go back\n', (answer) => {
    switch (answer) {
      case "1":
        displayCashMenu(total);
        break;
      case "2":
        displayCardMenu(total);
        break;
      case "3":
        displayCart();
        break;
      default:
        displayCheckoutMenu(total);
    }
  });
}

// refactor balance to be global variable
var displayCashMenu = function (total) {
  rl.question('Enter dollar amount or \"b\" to go back.\n', (answer) => {
    var cashPaid = parseFloat(answer);
    if (answer == "b") {
      displayCheckoutMenu(total);
    } else if (isNaN(cashPaid) || cashPaid <= 0 || answer.split(".").length > 1 && answer.split(".")[1].length > 2) {
      console.log('Invalid option!');
      displayCashMenu(total);
    } else {
      var balance = (total - cashPaid).toFixed(2);
      if (balance < 0) {
        console.log('Thank you! Your change is $' + (balance * -1).toFixed(2) + '.');
        removeAllItems();
        displayMainMenu();
      } else if (balance > 0) {
        console.log('Your new balance is $' + balance + '.');
        displayCashMenu(balance);
      } else {
        console.log('Thank you!');
        removeAllItems();
        displayMainMenu();
      }
    }
  });
}

var displayCardMenu = function (total) {
  console.log('Thank you! Your card has been charged $' + total + '.');
  removeAllItems();
  displayMainMenu();
}


// front-end
console.log('Welcome to Sitka Groceries!');
displayMainMenu();
