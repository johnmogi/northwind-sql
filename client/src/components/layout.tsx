import React from 'react';
import { ProductModel } from '../models/Product-model';
interface bookState {
    products: ProductModel[];
  }
class Layout extends React.Component<any, bookState> {
    public constructor(props: any) {
        super(props);
        this.state = { products: [] };
      }
      public componentDidMount(): void {
        fetch("http://localhost:3000/api/products")
          .then((response) => response.json())
          .then((products) => this.setState({ products }))
          .catch((err) => alert(err.message));
      }
      public render(): JSX.Element {
        return ( 
            <>
            <h1>
            here are our {this.state.products.length} books:
            </h1>
            </>
         );
    }
}
export default Layout;