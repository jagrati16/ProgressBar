import React from "react";
import ReactDOM from "react-dom";
import ProgressBar from "./ProgressBar";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      progressBars: [],
    };
  }

  createNew = () => {
    const progressBars = [...this.state.progressBars];
    const { count } = this.state;
    if (count === 0) {
      progressBars.push("inProgress");
    } else {
      let tempCount = 0;
      progressBars.forEach((d) => {
        if (d === "inProgress") {
          tempCount++;
        }
      });
      if (tempCount < 3) {
        progressBars.push("inProgress");
      } else {
        progressBars.push("pending");
      }
    }
    this.setState((prevState) => {
      return {
        count: prevState.count + 1,
        progressBars,
      };
    });
  };

  onTransitionEnd = (index) => {
    console.log("inside transition end", index);
    const bars = [...this.state.progressBars];
    bars[index] = "completed";
    let found = 0;
    for (let i = index + 1; i < bars.length; i++) {
      if (bars[i] === "pending" && !found) {
        bars[i] = "inProgress";
        found = 1;
      }
    }
    this.setState({
      progressBars: bars,
    });
  };

  renderProgressBars = () => {
    const { progressBars } = this.state;
    return progressBars.map((d, index) => {
      return (
        <ProgressBar
          state={d}
          index={index}
          onTransitionEnd={this.onTransitionEnd}
        />
      );
    });
  };

  render() {
    console.log(this.state.progressBars);
    return (
      <React.Fragment>
        <button onClick={this.createNew}>Add ProgressBar</button>
        {this.renderProgressBars()}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
