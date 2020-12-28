import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";

import FileSaver from "file-saver";

import { storage } from "../firebase";

import AdminService from "../services/adminService";
import ChairmanService from "../services/chairmanService";
import ConferenceService from "../services/conferenceService";

export default class BoardChairman extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      search: "",
      selectedUser: "",
      users: [],
      papers: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.downloadPapers = this.downloadPapers.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  downloadPapers(e) {
    this.state.papers.map((paper) => {
      var oReq = new XMLHttpRequest();
      // The Endpoint of your server

      // Configure XMLHttpRequest
      oReq.open("GET", paper.url, true);

      // Important to use the blob response type
      oReq.responseType = "blob";

      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = function () {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        var file = new Blob([oReq.response], {
          type: "application/pdf",
        });

        // Generate file download directly in the browser !
        FileSaver.saveAs(file, paper.title);
      };

      oReq.send();
    });
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

  onClick(e) {
    ChairmanService.setUserRole(e.target.innerText).then((res) =>
      console.log({ res })
    );
  }

  componentDidMount() {
    AdminService.getAllUsers()
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .then(() => {
        ChairmanService.getPapers().then((res) => {
          this.setState({
            papers: res.data,
          });
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
          <label>Lista korisnika:</label>
          {this.state.users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}

          <br />
          <br />

          <label>Ukupan broj predanih radova: {this.state.papers.length}</label>
          <button
            className="btn btn-primary btn-block"
            onClick={this.downloadPapers}
          >
            Preuzmi sve radove
          </button>

          <br />
          <br />

          <Form>
            <div className="form-group">
              <label>
                Pronađi korisnika i pridodaj ulogu recenzenta:
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
        </header>
      </div>
    );
  }
}
