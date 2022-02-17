import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { default as Header } from "./components/navigation/header.container";
import { Pdp } from "./pages/pdp/pdp.page";
import { Plp } from "./pages/plp/plp.page";
import { Cart } from "./pages/cart/cart.page";

import { Routes, Route } from "react-router-dom";
import { Cache, gql } from "@apollo/client";

class App extends React.Component {
  render() {
    let data = "";
    
    // Cache.query({
    //   query: gql`
    //     query {
    //       categories {
    //         name
    //         products {
    //           id
    //           name
    //           brand
    //         }
    //       }
    //     }
    //   `,
    // }).then((result) => (data = result));

    return (
      <div className="App">
        <Header data={this.props.data}></Header>
        <Routes>
          <Route exact path="/" element={<Plp />} />
          <Route path="/pdp" element={<Pdp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

export default App;
