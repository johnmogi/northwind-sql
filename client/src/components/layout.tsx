import React, { SyntheticEvent } from 'react';
import { ProductModel } from '../models/Product-model';
import './layout.css';

interface bookState {
    products: ProductModel[];
    product: ProductModel;
    reDraw: boolean;
}
class Layout extends React.Component<any, bookState> {
    public constructor(props: any) {
        super(props);
        this.state = { products: [], product: new ProductModel(), reDraw: false };
    }

    public fetchProducts(): void {
        this.setState({ products: [] }); //redraw - better approach then component update

        fetch("http://localhost:3000/api/products")
            .then((response) => response.json())
            .then((products) => this.setState({ products }))
            .catch((err) => alert(err.message));
    }

    public componentDidMount(): void {
        this.fetchProducts()
    }
    public componentDidUpdate(): void {if(this.state.reDraw){
        this.setState({ reDraw: false });
        this.fetchProducts()}}

    public render(): JSX.Element {
        return (
            <div className="container">
                <h1>
                    here are our {this.state.products.length} Products:
            </h1>
<div className="row">
<div className="col-3">
                <form>
                    <label>Add a Product :</label>
                    <br /><br />
                    <input type="text" onChange={this.setProductName} placeholder="ProductName" value={this.state.product.ProductName || ''} />
                    <br /><br />

                    <input type="number" onChange={this.setSupplierID} placeholder="SupplierID" value={this.state.product.SupplierID || ''} />
                    <br /><br />

                    <input type="number" onChange={this.setCategoryID} placeholder="CategoryID" value={this.state.product.CategoryID || ''} />
                    <br /><br />

                    <input type="number" onChange={this.setQuantityPerUnit} placeholder="QuantityPerUnit" value={this.state.product.QuantityPerUnit || ''} />
                    <br /><br />

                    <input type="number" onChange={this.setUnitPrice} placeholder="UnitPrice" value={this.state.product.UnitPrice || ''} />
                    <br /><br />

                    <input type="number" onChange={this.setUnitsInStock} placeholder="UnitsInStock" value={this.state.product.UnitsInStock || ''} />
                    <br /><br />
                    <button type="button" className="btn btn-primary" onClick={this.addProduct}>Add Product</button>
                </form>
                </div> 
                
<div className="col-9">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>QuantityPerUnit</td>
                            <td>SupplierID</td>
                            <td>delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((p) => (
                            <tr key={p.ProductID}>
                                <td>{p.ProductName}</td>
                                <td>{p.CategoryID}</td>
                                <td>{p.UnitPrice}</td>
                                <td>{p.QuantityPerUnit}</td>
                                <td>{p.SupplierID}</td>
                                <td>{p.UnitsInStock}</td>
                                <td><button onClick={this.deleteItem} value={p.ProductID}>X</button></td>


                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div> 
            </div>
        );
    }

    private setProductName = (args: SyntheticEvent) => {
        const ProductName = (args.target as HTMLInputElement).value;
        const product = { ...this.state.product };
        product.ProductName = ProductName;
        this.setState({ product });
    };
    private setSupplierID = (args: SyntheticEvent) => {
        const SupplierID = (args.target as HTMLInputElement).value;
        const product = { ...this.state.product };
        product.SupplierID = +SupplierID;
        this.setState({ product });
    };
    private setCategoryID = (args: SyntheticEvent) => {
        const CategoryID = (args.target as HTMLInputElement).value;
        const product = { ...this.state.product };
        product.CategoryID = +CategoryID;
        this.setState({ product });
    };
    private setQuantityPerUnit = (args: SyntheticEvent) => {
        const QuantityPerUnit = (args.target as HTMLInputElement).value;
        const product = { ...this.state.product };
        product.QuantityPerUnit = QuantityPerUnit;
        this.setState({ product });
    };
    private setUnitPrice = (args: SyntheticEvent) => {
        const UnitPrice = (args.target as HTMLInputElement).value;
        const product = { ...this.state.product };
        product.UnitPrice = +UnitPrice;
        this.setState({ product });
    };


    private setUnitsInStock = (args: SyntheticEvent) => {
        const UnitsInStock = (args.target as HTMLInputElement).value;
        const product = { ...this.state.product };
        product.UnitsInStock = +UnitsInStock;
        this.setState({ product });
    };

    private deleteItem = (args: SyntheticEvent) => {
        const itemID = (args.target as HTMLButtonElement).value;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.state.product),
        };
        fetch(`http://localhost:3000/api/products/${itemID}`, options)
            .then((response) => response.json())
            .then((product) => console.log(`Product ${itemID} has been deleted.`))
            .catch((err) => alert(err.message));
            this.setState({ reDraw: true });
    }
    private addProduct = () => {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.state.product),
        };
        fetch("http://localhost:3000/api/products", options)
            .then((response) => response.json())
            .then((product) => console.log(`Product ${this.state.product.ProductID} has been added.`))
            .catch((err) => alert(err.message));
            this.setState({ reDraw: true });
    };
}
export default Layout;