import React from "react";
import "./App.css";
import Table from "./Components/Table_main";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Table />
        </header>
      </div>
    );
  }
}

export default App;
