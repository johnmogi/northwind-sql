const dal = require("../data-access-layer/dal");

async function getAllProductsAsync() {
  const sql = "SELECT * FROM Products";
  const products = await dal.executeAsync(sql);
  return products;
}
async function getOneProductsAsync(id) {
  const sql = `SELECT * FROM Products WHERE productID = ${id}`;
  const products = await dal.executeAsync(sql);
  return products;
}
module.exports = { getAllProductsAsync, getOneProductsAsync };
