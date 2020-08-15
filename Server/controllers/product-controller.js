const express = require("express");
const productLogic = require("../business-logic-layer/product-logic");
const router = express.Router();
// GET <http://localhost:3000/api/products>
router.get("/products", async (request, response) => {
  try {
    const products = await productLogic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
module.exports = router;
