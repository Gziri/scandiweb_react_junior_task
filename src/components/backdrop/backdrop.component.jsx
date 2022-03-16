import React, { Component } from "react";
import "./backdrop.styles.sass";
import { withRouter } from "../HOC/withRouter";

import Minicart from "../minicart/minicart.component";

class Backdrop extends Component {
  render() {
    let onCartPage = this.props.location.pathname === "/cart";
    if (onCartPage) {
      return null;
    } else {
      return (
        <div className="backdrop">
          <Minicart hideBackdrop={this.props.click} />
          <div className="clickableArea" onClick={this.props.click} />
        </div>
      );
    }
  }
}

export default withRouter(Backdrop);
