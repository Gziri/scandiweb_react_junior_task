import React, { Component } from 'react';
import './custom-button.styles.sass';


export class CustomButton extends Component{



render(){
return(
<button className={`${this.props.classes}`} onClick={()=>this.props.clicked}>
{this.props.children}
</button>
)
}
}