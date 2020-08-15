const express = require("express");
const cors = require("cors");
const productController = require("./controllers/product-controller");
const server = express();
server.use(cors());
server.use(express.json());
server.use("/api", productController);
server.listen(3000, () => console.log("Listening on <http://localhost:3000>"));
