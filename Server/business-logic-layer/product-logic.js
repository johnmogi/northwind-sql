const dal = require("../data-access-layer/dal");

async function getAllProductsAsync() {
    const sql = "SELECT * FROM Products";
    const products = await dal.executeAsync(sql);
    return products;
}

async function getOneProductAsync(id) {
    const sql = `SELECT * FROM Products WHERE productID = ${id}`;
    const product = await dal.executeAsync(sql);
    return product;
}

async function addProductAsync(info) {
    const sql = `INSERT INTO Products (ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued) VALUES
  ( '${info.ProductName}', ${info.SupplierID}, ${info.CategoryID}, ${info.QuantityPerUnit}, ${info.UnitPrice},  '1', '0', '0', b'0')`;
    const product = await dal.executeAsync(sql);
    return product;
}

async function getAllProductsFromCatAsync(cat) {
    const sql = `SELECT * FROM Products WHERE CategoryID = ${cat}`;
    const products = await dal.executeAsync(sql);
    return products;
}

async function deleteOneProductAsync(id) {
    const sql = `DELETE FROM Products WHERE productID = ${id}`;
    const product = await dal.executeAsync(sql);
    return product;
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    getAllProductsFromCatAsync,
    addProductAsync,
    deleteOneProductAsync
};