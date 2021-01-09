import React, { Component } from "react";

import UserService from "../services/userService";
import ChairmanService from "../services/chairmanService";
import ConferenceDetails from "../components/conferenceDetails";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confDetails: [],
      papers: [],
    };
  }

  componentDidMount() {
    UserService.getPublicContent()
      .then(
        (response) => {
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
      )
      .then(() => {
        ChairmanService.getPapers().then((res) => {
          this.setState({
            papers: [...this.state.papers, ...res.data],
          });
        });
      });
  }

  render() {
    return (
      <div className="container">
        <p style={{ fontSize: "30px" }}>Novosti</p>
        {this.state.confDetails.map((item) => (
          <ConferenceDetails
            key={item.id}
            title={item.title}
            description={item.description}
            papers={this.state.papers}
            section={item.section}
          />
        ))}
      </div>
    );
  }
}
