import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductPage from "./components/Product/ProductPage";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/product" component={ProductPage} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
