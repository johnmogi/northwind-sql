import React, { SyntheticEvent } from 'react';
import { ProductModel } from '../models/Product-model';
import './layout.css';

interface bookState {
    products: ProductModel[];
    product:ProductModel;
    reDraw: boolean;
  }
class Layout extends React.Component<any, bookState> {
    public constructor(props: any) {
        super(props);
        this.state = { products: [], product: new ProductModel(), reDraw: false };
      }

      public fetchProducts():void{
        fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((products) => this.setState({ products }))
        .catch((err) => alert(err.message));
      }

      public componentDidMount(): void {
            this.fetchProducts()
      }
      public render(): JSX.Element {
        return ( 
            <div className="container">
            <h1>
            here are our {this.state.products.length} books:
            </h1>

            <hr/>
            <form>
  <label>Add a Product :</label>
  <br /><br />  
  <input type="text" onChange={this.setProductName} placeholder="ProductName" value={this.state.product.ProductName} />
  <br /><br />
  
  <input type="number" onChange={this.setSupplierID} placeholder="SupplierID" value={this.state.product.SupplierID} />
  <br /><br />

  <input type="number" onChange={this.setCategoryID} placeholder="CategoryID" value={this.state.product.CategoryID} />
  <br /><br />

  <input type="number" onChange={this.setQuantityPerUnit} placeholder="QuantityPerUnit" value={this.state.product.QuantityPerUnit} />
  <br /><br />

  <input type="number" onChange={this.setUnitPrice} placeholder="UnitPrice" value={this.state.product.UnitPrice} />
  <br /><br />

  <input type="number" onChange={this.setUnitsInStock} placeholder="UnitsInStock" value={this.state.product.UnitsInStock} />
  <br /><br />
  <button type="button" onClick={this.addProduct}>Add Product</button> 
  </form>
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

private addProduct = () => {
    this.setState({ reDraw:true });
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
      .then((product) => alert("Product has been added. ID: " + product.productID))
      .catch((err) => alert(err.message));
      this.fetchProducts()
 };
}
export default Layout;