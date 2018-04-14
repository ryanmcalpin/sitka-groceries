const readline = require('readline');

console.log('Welcome to Sitka Groceries!');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Choose an option below.\n1) Shop\n2) View Cart\n3) Checkout\n4) Exit\nYour Choice: ', (answer) => {
  // TODO: Log the answer in a database
  // console.log(`Thank you for your valuable feedback: ${answer}`);
  if (answer == "4") {
    console.log("Goodbye!");
    rl.close();
  }

});
