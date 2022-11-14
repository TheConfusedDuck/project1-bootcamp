import React, { Fragment } from "react";
import Form from "./Form";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { nanoid } from "nanoid";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // mainData is an array of objects, where formData is added or removed
      mainData: [
        {
          id: 1,
          ticker: "BTC",
          price: "15150",
          amount: "1.5",
          trade: "Buy",
        },
        {
          id: 2,
          ticker: "ETH",
          price: "1231",
          amount: "3.4",
          trade: "Buy",
        },
        {
          id: 3,
          ticker: "ETH",
          price: "1400",
          amount: "2.3",
          trade: "Buy",
        },
      ],

      formData: {
        ticker: "",
        price: "",
        amount: "",
        trade: "",
      },

      editFormData: {
        ticker: "",
        price: "",
        amount: "",
        trade: "",
      },

      tradeid: null,

      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  }

  /// EVENT LISTENERS FOR FORM ///

  // DONE
  handleFormSubmit = (event) => {
    event.preventDefault();

    const shallowCopyWithId = {
      id: nanoid(),
      ticker: this.state.formData["ticker"],
      price: this.state.formData["price"],
      amount: this.state.formData["amount"],
      trade: this.state.formData["trade"],
    };

    const shallowCopy = [...this.state.mainData, shallowCopyWithId];

    const shallowCopyFormData = {
      ticker: "",
      price: "",
      amount: "",
      trade: "",
    };

    // console.log(shallowCopy);

    this.setState(
      {
        mainData: shallowCopy,
        formData: shallowCopyFormData,
      },
      () => {
        event.target.reset();
      }
    );
  };

  // DONE
  handleFormChange = (event) => {
    event.preventDefault();

    let formName = event.target.name;
    let value = event.target.value;
    const shallowCopy = this.state.formData;
    // console.log(value);
    // console.log(formName);
    shallowCopy[formName] = value;

    // console.log(shallowCopy);

    this.setState(
      {
        formData: shallowCopy,
      }
      // () => {
      //   console.log(this.state.formData);
      // }
    );
  };

  /// EVENT LISTENERS FOR EDITABLEROW ///

  // DONE
  handleTableEditSubmit = (event) => {
    event.preventDefault();

    const editedFormData = {
      id: this.state.tradeid,
      ticker: this.state.editFormData.ticker,
      price: this.state.editFormData.price,
      amount: this.state.editFormData.amount,
      trade: this.state.editFormData.trade,
    };

    const index = this.state.mainData.findIndex(
      (trade) => trade.id === editedFormData.id
    );

    const shallowCopy = this.state.mainData;

    shallowCopy[index] = editedFormData;

    this.setState(
      {
        mainData: shallowCopy,
        tradeid: null,
      }
      // () => {
      //   console.log(this.state.mainData);
      // }
    );
  };

  // DONE
  handleTableEditChange = (event) => {
    event.preventDefault();

    const shallowCopy = Object.assign({}, this.state.editFormData);
    let formName = event.target.name;
    let formValue = event.target.value;

    shallowCopy[formName] = formValue;
    // console.log(shallowCopy[formName]);

    // Changes made to the form is stored into editFormData state (will be used later when saving
    this.setState(
      {
        editFormData: shallowCopy,
      },
      () => {
        console.log(this.state.editFormData);
      }
    );
  };

  // DONE
  handleTableCancelClick = (event) => {
    event.preventDefault();

    this.setState({
      tradeid: null,
    });
  };

  /// EVENT LISTENERS FOR READONLYROW ///

  // DONE
  handleTableEditClick = (event, trade) => {
    event.preventDefault();

    // Create shallow copy to show existing daTA
    const tradeData = {
      ticker: trade.ticker,
      price: trade.price,
      amount: trade.amount,
      trade: trade.trade,
    };

    this.setState({
      tradeid: trade.id,
      editFormData: tradeData,
    });
  };

  // DONE
  handleTableDeleteClick = (tradeid) => {
    const index = this.state.mainData.findIndex(
      (trades) => trades.id === tradeid
    );

    const shallowCopy = this.state.mainData;
    shallowCopy.splice(index, 1);

    // console.log(shallowCopy);

    this.setState({
      mainData: shallowCopy,
    });
  };

  // Update the chart data
  // DONE
  updateChartData = (event) => {
    event.preventDefault();
    const mainDataLength = this.state.mainData.length;
    let tickerObject = {};

    for (let i = 0; i < mainDataLength; i++) {
      let ticker = this.state.mainData[i].ticker;
      let trade = this.state.mainData[i].trade;
      let amount = parseFloat(this.state.mainData[i].amount);

      if (!(ticker in tickerObject) && trade === "Buy") {
        tickerObject[ticker] = amount;
      } else if (trade === "Buy") {
        tickerObject[ticker] += amount;
      } else if (trade === "Sell") {
        tickerObject[ticker] -= amount;
      }
      // console.log("Inside for loop", tickerObject);
    }
    // console.log(tickerObject);

    let tickerArray = Object.keys(tickerObject);
    let amountArray = Object.values(tickerObject);
    // console.log("ticker array: ", tickerArray);
    // console.log("amount array: ", amountArray);

    let shallowCopy = this.state.chartData;
    shallowCopy["labels"] = tickerArray;
    shallowCopy["datasets"][0]["data"] = amountArray;
    // console.log("ticker object: ", tickerObject);
    // console.log("amount array: ", amountArray);

    // console.log("Shallow Copy: ", shallowCopy);

    this.setState(
      {
        chartData: { ...shallowCopy },
      },
      () => {
        console.log("Chart Data: ", this.state.chartData);
      }
    );
  };

  render() {
    return (
      <div className="app-container">
        <div>
          <Chart type="doughnut" data={this.state.chartData} redraw />
          <button type="submit" onClick={this.updateChartData}>
            Update Chart
          </button>
        </div>

        <h2>Input your trades</h2>
        <Form
          handleFormSubmit={this.handleFormSubmit}
          handleFormChange={this.handleFormChange}
          formData={this.state.formData}
        />

        <h2>Your current trades</h2>
        <form onSubmit={this.handleTableEditSubmit}>
          <table>
            <thead>
              <tr>
                <th>ticker</th>
                <th>price</th>
                <th>amount</th>
                <th>trade</th>
                <th>actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.mainData.map((trade) => (
                <Fragment>
                  {this.state.tradeid === trade.id ? (
                    <EditableRow
                      handleTableEditChange={this.handleTableEditChange}
                      handleTableEditSubmit={this.handleTableEditSubmit}
                      handleCancelClick={this.handleTableCancelClick}
                      editFormData={this.state.editFormData}
                    />
                  ) : (
                    <ReadOnlyRow
                      trade={trade}
                      handleEditClick={this.handleTableEditClick}
                      handleDeleteOnClick={this.handleTableDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
