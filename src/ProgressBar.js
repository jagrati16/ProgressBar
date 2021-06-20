import React from "react";

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentange: 0,
    };
  }

  componentDidMount() {
    if (this.props.state === "inProgress") {
      setTimeout(() => {
        this.setState({ percentange: 100 });
      }, 10);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.state !== this.props.state &&
      this.props.state === "inProgress"
    ) {
      setTimeout(() => {
        this.setState({ percentange: 100 });
      }, 10);
    }
  }

  onTransitionEnd = () => {
    const { index } = this.props;
    this.props.onTransitionEnd(index);
  };

  render() {
    return (
      <div className="progress-bar" onTransitionEnd={this.onTransitionEnd}>
        <div
          className="inner"
          style={{ width: `${this.state.percentange}%` }}
        />
      </div>
    );
  }
}
