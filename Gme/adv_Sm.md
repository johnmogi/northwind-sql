1. check ou these methods for crud:
<controller-></controller->
// PUT http://localhost:3000/api/products/7
router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const product = request.body;
        product.id = id;
        const updatedProduct = await productsLogic.updateFullProductAsync(product); 
        if(updatedProduct === null) {
            response.sendStatus(404);
            return;
        }  
        response.json(updatedProduct);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});
// PATCH http://localhost:3000/api/products/7
router.patch("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const product = request.body;
        product.id = id;
        const updatedProduct = await productsLogic.updatePartialProductAsync(product);
        if(updatedProduct === null) {
            response.sendStatus(404);
            return;
        }
        response.json(updatedProduct);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});
<logic-></logic->
async function updateFullProductAsync(product) {
    const sql = `
        UPDATE + SET
            ProductName = '${product.name}',
            UnitPrice = ${product.price},
            UnitsInStock = ${product.stock}
        WHERE ProductID = ${product.id}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : product;
}
async function updatePartialProductAsync(product) {
    let sql = "UPDATE Products SET ";
    if(product.name) {
        sql += `ProductName = '${product.name}',`
    }
    if(product.price) {
        sql += `UnitPrice = ${product.price},`
    }
    if(product.stock) {
        sql += `UnitsInStock = ${product.stock},`
    }
    // Delete last comma: 
    sql = sql.substr(0, sql.length - 1);
    sql += ` WHERE ProductID = ${product.id}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : product;
}

2. fix date format func:
function fixDateFormat(date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return `${year}-${month}-${day}`;
}
'${fixDateFormat(vacation.fromDate)}'

3. simplify date:
DATE_FORMAT(date, "%m/%d/%Y %H:%i") as date
SELECT DATE_FORMAT(date, "%m/%d/%Y") as date from games
 gameID, name, DATE_FORMAT(date, "%m/%d/%Y") as date
 
4. uncontrolled issues? ask me how...
https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
https://medium.com/better-programming/to-be-or-not-to-be-2c372198a01c
                    <input type="number" onChange={this.setUnitPrice} placeholder="UnitPrice" value={this.state.product.UnitPrice || ''} />


5. d