import React from "react";

export default class ReadOnlyRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.trade);
    return (
      <tr>
        <td>{this.props.trade.ticker}</td>
        <td>{this.props.trade.price}</td>
        <td>{this.props.trade.amount}</td>
        <td>{this.props.trade.trade}</td>
        <td>
          <button
            type="button"
            onClick={(event) =>
              this.props.handleEditClick(event, this.props.trade)
            }
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => this.props.handleDeleteOnClick(this.props.trade.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
