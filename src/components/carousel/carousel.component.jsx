import React, { Component } from "react";
import "./carousel.styles.css";

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      length: props.children.length,
    };
  }
  
  render() {
    const { children } = this.props;
    const next = () => {
      let prevState = this.state.currentIndex;
      let length = this.state.length;

      if (prevState < length - 1) {
        this.setState({ ...this.state, currentIndex: prevState + 1 });
      }
    };

    const prev = () => {
      let prevState = this.state.currentIndex;

      if (prevState > 0) {
        this.setState({ ...this.state, currentIndex: prevState - 1 });
      }
    };

    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <button className="left-arrow" onClick={prev}>
            &lt;
          </button>
          <div className="carousel-content-wrapper">
            <div
              className="carousel-content"
              style={{
                transform: `translateX(-${this.state.currentIndex * 100}%)`,
              }}
            >
              {children}
            </div>
          </div>
          <button className="right-arrow" onClick={next}>
            &gt;
          </button>
        </div>
      </div>
    );
  }
}
