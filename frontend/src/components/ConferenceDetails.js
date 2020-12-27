import React, { Component } from "react";

export default class ConferenceDetails extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: "lightblue", fontSize: "25px" }}>Konferencija</h1>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        <hr />
      </div>
    );
  }
}
