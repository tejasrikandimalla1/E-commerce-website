const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// GET /cart/:userId
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST /cart/add-to-cart
router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, quantity, cost, productName, imageUrl } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    let itemExists = false;
    cart.items = cart.items.map(item => {
      if (item.product._id.toString() === productId) {
        itemExists = true;
        // Updating quantity and recalculating cost
        return {
          ...item,
          quantity: item.quantity + quantity,
          cost: (item.quantity + quantity) * item.product.cost // Assuming cost is per unit
        };
      }
      return item;
    });

    if (!itemExists) {
      // Add a new item to the cart
      cart.items.push({
        product: productId,
        productName,
        quantity,
        cost: quantity * cost, // Calculating total cost based on the provided cost
        imageUrl
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// DELETE /cart/remove-item/:userId/:itemId
router.delete("/remove-item/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    console.log("Original Cart Items:", cart.items);

    // Remove the item with the specified itemId from the cart
    cart.items = cart.items.filter((item) => item.product.toString() !== itemId);

    console.log("Updated Cart Items:", cart.items);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.post("/update-cart", async (req, res) => {
  const { userId, items } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    // Update the cart items
    cart.items = items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      cost: item.cost,
      productName: item.productName,
      imageUrl: item.imageUrl
    }));

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE /cart/clear/:userId
router.delete("/clear/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    // Clear the cart items
    cart.items = [];

    await cart.save();
    res.json({ msg: "Cart cleared successfully", cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
