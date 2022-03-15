import React from "react";
import "./App.css";
import Header from "./components/header/header.component";
import Pdp from "./pages/pdp/pdp.page";
import Plp from "./pages/plp/plp.page";
import Cart from "./pages/cart/cart.page";

import { Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    const data = this.props?.data;

    return (
      <div className="App">
        <Header categories={data?.categories} currencies={data?.categories} />
        <Routes>
          <Route exact path="/" element={<Plp />} />
          <Route path="/pdp" element={<Pdp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

export default App;
