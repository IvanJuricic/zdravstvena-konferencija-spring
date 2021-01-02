import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UserService from "../services/userService";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  /* TODO: prepraviti profilnu komponentu */
  componentDidMount() {
    const id = this.props.user.id;

    UserService.getUserData(id).then((res) =>
      this.setState({
        user: res.data,
      })
    );
  }

  render() {
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
