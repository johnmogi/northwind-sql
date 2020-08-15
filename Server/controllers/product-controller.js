const express = require("express");
const productLogic = require("../business-logic-layer/product-logic");
const router = express.Router();

// GET <http://localhost:3000/api/products>
router.get("/products", async(request, response) => {
    try {
        const products = await productLogic.getAllProductsAsync();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// GET <http://localhost:3000/api/products/product/:id>
router.get("/products/product/:id", async(request, response) => {
    const id = +request.params.id
    try {
        const product = await productLogic.getOneProductAsync(id);
        response.json(product);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// GET <http://localhost:3000/api/products/category/:cat>
router.get("/products/category/:cat", async(request, response) => {
    const cat = +request.params.cat
    console.log(cat)
    try {
        const products = await productLogic.getAllProductsFromCatAsync(cat);
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// POST <http://localhost:3000/api/products/>
router.post("/products", async(request, response) => {
    try {
        const product = request.body;
        const addedProduct = await productLogic.addProductAsync(product);
        response.status(201).json(addedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE <http://localhost:3000/api/products/:id>
router.delete("/products/:id", async(request, response) => {
    try {
        const id = +request.params.id;
        const product = await productLogic.deleteOneProductAsync(id);
        response.json(product);
    } catch (err) {
        response.status(200);
    }
});

module.exports = router;