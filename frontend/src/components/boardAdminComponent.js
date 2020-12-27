import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";

import AdminService from "../services/adminService";
import ConferenceService from "../services/conferenceService";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      search: "",
      selectedUser: "",
      users: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    console.log(e.target.innerText);
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
      ConferenceService.submitConfDetails(data).then(() => e.target.reset());
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
      return this.state.search && user.username.indexOf(this.state.search) >= 0;
    });

    return (
      <div className="container">
        <header className="jumbotron">
          <label>Podaci o novoj konferenciji:</label>
          <Form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>
                Naslov
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Opis konferencije
                <Textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </label>
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Objavi</button>
            </div>
          </Form>
          <br />
          <br />
          <Form>
            <div className="form-group">
              <label>
                Pronađi korisnika i pridodaj ulogu predsjedavajućeg:
                <Input
                  placeholder="Pronađi korisnika"
                  type="text"
                  className="form-control"
                  name="search"
                  value={this.state.search}
                  autocomplete="off"
                  onChange={this.onChange}
                />
              </label>
              {userNames.map((user) => (
                <li key={user.id} onClick={this.onClick}>
                  {user.username}
                </li>
              ))}
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Dodaj ulogu</button>
            </div>
          </Form>
          <br />
          <br />

          <div>
            <label>Trenutno ulogirani korisnici:</label>
          </div>
        </header>
      </div>
    );
  }
}
