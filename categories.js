const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// GET /categories return all  
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET /categories/:id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
});

// POST /categories new
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT /categories/:id update
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;

  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    category.name = name;
    category.description = description;

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
});

// DELETE /categories/:id
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await category.remove();
    res.json({ msg: "Category removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
