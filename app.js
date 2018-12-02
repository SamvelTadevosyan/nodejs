const {
  User,
  Product,
} = require('./modules');

const config = require('./config/app.json');

console.log(config.name);
new User();
new Product();