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
        <h3>
          <strong style={{ marginRight: "10px" }}>Korisničko ime:</strong>
          {currentUser.username}
        </h3>
        <br />
        <br />
        <h5>
          <strong style={{ marginRight: "10px" }}>ID korisnika:</strong>{" "}
          {currentUser.id}
        </h5>
        <h5>
          <strong style={{ marginRight: "10px" }}>Sekcija korisnika:</strong>{" "}
          {currentUser.section}
        </h5>
        <h5>
          <strong style={{ marginRight: "10px" }}>Email:</strong>{" "}
          {currentUser.email}
        </h5>
        <h5>
          <strong style={{ marginRight: "10px" }}>Institut korisnika:</strong>{" "}
          {currentUser.institute}
        </h5>
        <h5>
          <strong>Korisničke role:</strong>

          {currentUser.roles &&
            currentUser.roles.map((role, index) => (
              <div style={{ marginLeft: "10px" }} key={index}>
                {role}
              </div>
            ))}
        </h5>
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
