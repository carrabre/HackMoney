import React from "react";
import { Card, Button, Table, Row, Col } from "react-bootstrap";

class Quantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { min: 0.0, max: 0.01 };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    this.increment2 = this.increment2.bind(this);
    this.decrement2 = this.decrement2.bind(this);
  }

  increment() {
    this.setState((prevState) => {
      console.log(prevState.min, prevState.max, "before");
      let min = prevState.min + 0.01;
      console.log(min.toFixed(2), "after min");
      if (min < prevState.max) {
        return { min: prevState.min + 0.01 };
      }
    });
  }

  decrement() {
    this.setState((prevState) => {
      return { min: prevState.min > 0.0 ? prevState.min - 0.01 : 0.0 };
    });
  }

  increment2() {
    console.log("hello 2");
    this.setState((prevState) => {
      return { max: prevState.max + 0.01 };
    });
  }
  decrement2() {
    this.setState((prevState) => {
      console.log(prevState.max, prevState.max, "before");
      let max = prevState.max - 0.01;
      console.log(max, "after ");
      if (max > prevState.min) {
        console.log(--max, "should ve less ", prevState.min);
        console.log("inside if ", --max, prevState.max, this.state.max);

        return { max: prevState.max > 0.01 ? prevState.max - 0.01 : 0.01 };
      }
    });
  }

  render() {
    return (
      <Row>
        <Col lg={6}>
          <div className="quantity-input">
            <p className="top">Min Price</p>
            <button
              className="quantity-input__modifier quantity-input__modifier--left"
              onClick={this.decrement}
            >
              &mdash;
            </button>
            <input
              className="quantity-input__screen"
              type="text"
              value={this.state.min.toFixed(2)}
              readOnly
            />
            <button
              className="quantity-input__modifier quantity-input__modifier--right"
              onClick={this.increment}
            >
              &#xff0b;
            </button>
            <p className="top bottom">ETH per bMC</p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="quantity-input">
            <p className="top">Max Price</p>
            <button
              className="quantity-input__modifier quantity-input__modifier--left"
              onClick={this.decrement2}
            >
              &mdash;
            </button>
            <input
              className="quantity-input__screen"
              type="text"
              value={this.state.max.toFixed(2)}
              readOnly
            />
            <button
              className="quantity-input__modifier quantity-input__modifier--right"
              onClick={this.increment2}
            >
              &#xff0b;
            </button>
            <p className="top bottom">ETH per bMC</p>
          </div>
        </Col>
      </Row>
    );
  }
}
export default Quantity;
