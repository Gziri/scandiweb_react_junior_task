import React, { Component } from "react";
import "./header.styles.sass";

import { Currency } from "../currency/currency.component";
import { Minicart } from "../minicart/minicart.component";

export class Header extends Component {
  categoryClickHandler = () => {
    console.log("[header.component]: Category element was clicked");
  };

  render() {
    const categoriesList = [
      { name: "Cat1", active: true },
      { name: "Cat2", active: false },
      { name: "Cat3", active: false },
    ];

    const categoryElements = categoriesList.map((c) => (
      <div className={`${c.active ? "activeCategory" : null} categoryElement`} key={c.name} onClick={()=>console.log("data",this.props.data)}>
        {c.name}
      </div>
    ));
    return (
      <div className="header">
        <div className="categories">{categoryElements}</div>
        <div className=''>
          Logo Here
          </div>
        <div className="wrapper">
          <div className="currency">
            <Currency />
          </div>
        
          <div className="minicart">
            <Minicart />
            {this.props.hidden? "true":"false"}
          </div>
        </div>
      </div>
    );
  }
}
