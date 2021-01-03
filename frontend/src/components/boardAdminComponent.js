import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";

import AdminService from "../services/adminService";
import ConferenceService from "../services/conferenceService";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      search: "",
      userSearch: "",
      selectedUser: "",
      users: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }

  onUserClick(e) {
    AdminService.setUserRole(e.target.innerText).then((res) =>
      console.log({ res })
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
    };

    try {
      ConferenceService.submitConfDetails(data).then(() => {
        this.state.title = "";
        this.state.description = "";
      });
    } catch (err) {
      console.log("Greska pri slanju");
    }
  }

  componentDidMount() {
    AdminService.getAllUsers().then((response) => {
      this.setState({
        users: response.data,
      });
    });
  }

  render() {
    const userNames = this.state.users.filter((user) => {
      return (
        this.state.userSearch &&
        user.username.indexOf(this.state.userSearch) >= 0
      );
    });

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label style={{ fontSize: "24px" }} htmlFor="confTitle">
              Naslov konferencije
            </label>
            <input
              type="text"
              className="form-control"
              id="confTitle"
              name="title"
              value={this.state.title}
              autoComplete="false"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "24px" }} htmlFor="confDesc">
              Opis konferencije
            </label>
            <textarea
              className="form-control"
              id="confDesc"
              rows="3"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            ></textarea>
          </div>
          <button className="btn btn-dark btn-block" onClick={this.onSubmit}>
            Objavi
          </button>
        </form>
        <br />
        <br />
        <p style={{ fontSize: "24px" }}>
          Pretraži korisnike i pridodaj ulogu predsjedavajućeg
        </p>
        <div className="form-group col-md-4">
          <label htmlFor="inputEmail4">Korisničko ime</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            placeholder=""
            name="userSearch"
            value={this.state.userSearch}
            autoComplete="off"
            onChange={this.onChange}
            style={{ margin: "5px" }}
          />
          {userNames.map((user) => (
            <button
              type="button"
              className="btn btn-outline-dark"
              aria-pressed="true"
              key={user.id}
              onClick={this.onUserClick}
              style={{ margin: "2px" }}
            >
              {user.username}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
