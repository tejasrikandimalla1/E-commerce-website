const express = require('express');
const router = express.Router();
const authentication = require("./routes/authentication");
const categories = require("./routes/categories");
const products = require("./routes/products");
const users = require("./routes/users");
const cart = require("./routes/cart");

router.use("/authenticate", authentication);
router.use("/categories", categories);
router.use("/users", users);
router.use("/products", products);
router.use("/cart", cart);

module.exports = router;