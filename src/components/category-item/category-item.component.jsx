import React, { Component } from 'react';
import './category-item.styles.sass';


export class Categoryitem extends Component{



render(){
return(
<div>
<div className="categoryItemContainer">
          <div className="categoryItem">asd</div>
          <div className="categoryItemDetails">
            <div className="categoryItemName">Product Name</div>
            <div className="categoryItemPrice">$5000</div>
          </div>
        </div>
</div>
)
}
}