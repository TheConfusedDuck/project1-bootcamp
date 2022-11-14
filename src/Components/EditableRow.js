import React from "react";

export default class EditableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>
          <input
            type="text"
            name="ticker"
            required="required"
            placeholder="Enter a ticker"
            value={this.props.editFormData.ticker}
            onChange={this.props.handleTableEditChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="price"
            required="required"
            placeholder="Enter a price"
            value={this.props.editFormData.price}
            onChange={this.props.handleTableEditChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="amount"
            required="required"
            placeholder="Enter a amount"
            value={this.props.editFormData.amount}
            onChange={this.props.handleTableEditChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="trade"
            required="required"
            placeholder="Enter a email"
            value={this.props.editFormData.trade}
            onChange={this.props.handleTableEditChange}
          />
        </td>
        <td>
          <button type="submit">Save</button>
          <button onClick={this.props.handleCancelClick}>Cancel</button>
        </td>
      </tr>
    );
  }
}
