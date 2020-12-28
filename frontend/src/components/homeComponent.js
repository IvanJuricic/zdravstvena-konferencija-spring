import React, { Component } from "react";

import UserService from "../services/userService";
import ConferenceDetails from "../components/conferenceDetails";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confDetails: [],
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        console.log(response.data);
        this.setState({
          confDetails: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron"></header>
        {this.state.confDetails.map((item) => (
          <ConferenceDetails
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    );
  }
}
