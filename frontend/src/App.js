import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "popper.js/dist/popper.min";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/homeComponent";
import Profile from "./components/profile";
import BoardUser from "./components/boardUserComponent";
import BoardAdmin from "./components/boardAdminComponent";
import BoardChairman from "./components/boardChairmanComponent";
import BoardReviewer from "./components/boardReviewerComponent";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showChairmanBoard: false,
      showReviewerBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showChairmanBoard: user.roles.includes("ROLE_CHAIRMAN"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showReviewerBoard: user.roles.includes("ROLE_REVIEWER"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {
      currentUser,
      showChairmanBoard,
      showAdminBoard,
      showReviewerBoard,
    } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand mb-0 h1">
              bezKoder
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="navbar-brand">
                  Home
                </Link>
              </li>
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="navbar-brand">
                    Admin Board
                  </Link>
                </li>
              )}
              {console.log(this.state.showChairmanBoard)}

              {showReviewerBoard && (
                <li className="nav-item">
                  <Link to={"/reviewer"} className="navbar-brand">
                    Reviewer Board
                  </Link>
                </li>
              )}

              {showChairmanBoard && (
                <li className="nav-item">
                  <Link to={"/chairman"} className="navbar-brand">
                    Chairman Board
                  </Link>
                </li>
              )}

              {currentUser ? (
                !showAdminBoard && !showChairmanBoard && !showReviewerBoard ? (
                  <li className="nav-item">
                    <Link to={"/user"} className="navbar-brand">
                      User
                    </Link>
                  </li>
                ) : null
              ) : null}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="navbar-brand">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    className="navbar-brand"
                    onClick={this.logOut}
                  >
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="navbar-brand">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="navbar-brand">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div
            className="container"
            style={{ margin: "0 auto", padding: "30px" }}
          >
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/chairman" component={BoardChairman} />
              <Route path="/reviewer" component={BoardReviewer} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
