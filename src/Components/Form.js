import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleFormSubmit}>
          <input
            type="text"
            name="ticker"
            placeholder="Enter a ticker..."
            required="required"
            value={this.props.ticker}
            onChange={this.props.handleFormChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Enter a price..."
            required="required"
            value={this.props.price}
            onChange={this.props.handleFormChange}
          />
          <input
            type="text"
            name="amount"
            placeholder="Enter a amount..."
            required="required"
            value={this.props.amount}
            onChange={this.props.handleFormChange}
          />
          <input
            type="text"
            name="trade"
            placeholder="Enter a trade type..."
            required="required"
            value={this.props.trade}
            onChange={this.props.handleFormChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
