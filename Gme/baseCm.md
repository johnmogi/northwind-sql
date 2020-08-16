
0. cli:
npx create-react-app --template typescript
cd client
sudo npm start
mkdir components

1. touch layout.tsx:
import React, { Component } from "react"; 
export class Layout extends Component {
     render() {
          return (
              <>
              hi
              </>
          )
     }
    }

2. index.tsx (local service worker):
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Layout } from './components/layout';
ReactDOM.render(
    <Layout />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

24. BTSTRP:
npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
https://react-bootstrap.github.io/getting-started/introduction

25. layout.css:
.container{
    margin: 0 auto;
    max-width:1080px;
}
td ,table{
    text-align: center;
    padding:0 3px;
    border: 1px solid #000;
    border-spacing:0; 
    border-collapse: collapse; 
}
thead {
    background: #ccc;
    font-size:1.2em;font-weight:600;
}
tr:nth-child(even){
    background:#ccc2cc
}

3. mkdir models> Item.tsx:
export class RestoModel { public constructor(public restName?: string) {} }

4. data retrieval recepie:
build a model in model folder-
game-model.tsx-
export class GameModel { 
    public constructor(
        public name?: string
        ) {} }
new games component-
import React, { Component } from "react";
import { GameModel } from "../models/game-model";
// import { NavLink } from "react-router-dom";
interface gameState {
  games: GameModel[];
}
export class Games extends Component<any, gameState> {
  public constructor(props: any) {
    super(props);
    this.state = { games: [] };
  }
  public componentDidMount(): void {
    fetch("http://localhost:3006/api/games")
      .then((response) => response.json())
      .then((games) => this.setState({ games }))
      .catch((err) => alert(err.message));
  }
  public render(): JSX.Element {
    return (
      <div>
        Here are our {this.state.games.length} games
        {this.state.games.map((game) => (
          // <NavLink to={"/salaries-per-emp/" + rev.id} key={rev.id}>
          <div className="rev">
            name: {game.name} <br />
            {game}
          </div>
          // </NavLink>
        ))}
      </div>
    );  }}


42. base layout ready:
import React from 'react';
import { BookModel } from '../models/Book';
interface bookState {
    books: BookModel[];
  }
class Layout extends React.Component<any, bookState> {
    public constructor(props: any) {
        super(props);
        this.state = { books: [] };
      }
      public componentDidMount(): void {
        fetch("http://localhost:3000/api/books")
          .then((response) => response.json())
          .then((books) => this.setState({ books }))
          .catch((err) => alert(err.message));
      }
      public render(): JSX.Element {
        return ( 
            <>
            <h1>
            here are our {this.state.books.length} books:
            </h1>
            </>
         );
    }
}
export default Layout;

5. extend into tabular data:
   <table className="table">
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Category</td>
              <td>Price</td>
              <td>Rating</td>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <tr key={book.bookID}>
                <td>{book.bookID}</td>
                <td>{book.bookName}</td>
                <td>{book.category}</td>
                <td>{book.price}</td>
                <td>{book.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>

6. insert comment - base install:
ChangeEvent - import React, { Component, ChangeEvent } from "react"; 
it will look like this- watch closely the diff between state and interface-
interface gameState {
    games: GameModel[],
    scores: ScoreModel[],
    comments: CommentModel[],
    comment: CommentModel
  };
  export class Layout extends Component<any, gameState> {
    public constructor(props: any) {
        super(props);
        this.state = { games: [],
             scores: [],
              comments: [],
            comment:  new CommentModel()
 };

 8. each input key in insert form gets a function above render inside export comp-
 private setEmployeeID = (args: ChangeEvent
) => {
const employeeID = +args.target.value;
const salary = { ...this.state.salary };
salary.employeeID = employeeID;
this.setState({ salary });
};

9. select sample-
       {this.state.books.map(book =>
        <option key={book.bookID} value={book.bookID}>
            {book.bookName + " " + book.bookName}
        </option>
    )}


10. sample insert form - new:
    <form>
  <label>Choose a book :</label>
<select onChange={this.setBookID}>
<option disabled placeholder="Choose a book">Please select:</option>
        {this.state.books.map(b =>
        <option key={b.bookID} value={b.bookID}>
            {b.bookName}
        </option>
    )}
    </select>
    <br /><br />
  <input type="text" onChange={this.setUserName} value={this.state.review.userName} />
  <br /><br />
   <textarea onChange={this.setReview} value={this.state.review.review} ></textarea>
  <br /><br />
  <button type="button" onClick={this.addReview}>Add Review</button> 
  </form>

  11.  private setBookID = (args: SyntheticEvent) => {
    const bookID = (args.target as HTMLInputElement).value;
    const review = { ...this.state.review }; // Spread Operator
    review.bookID = +bookID;
    this.setState({ review });
  };

  12. private addReview = () => {
    console.log(this.state.review);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state.review),
    };
    fetch("http://localhost:3000/api/ratings", options)
      .then((response) => response.json())
      .then((review) => alert("Review has been added. ID: " + review.id))
      .catch((err) => alert(err.message));
  };

  13. restart: this time try to refresh state....

