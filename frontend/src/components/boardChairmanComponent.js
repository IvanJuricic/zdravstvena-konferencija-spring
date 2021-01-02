import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";

import SkyLight from "react-skylight";
import ModalUser from "./modalContentUser";

import FileSaver from "file-saver";

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
      isOpen: false,
      selectedUser: "",
      userSearch: "",
      editUser: { id: "", username: "", email: "" },
      users: [],
      papers: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.downloadPapers = this.downloadPapers.bind(this);

    this.setModalUser = this.setModalUser.bind(this);
    this.removeModalUser = this.removeModalUser.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
  }

  onUserSelect(e) {
    const user = this.state.users.filter((user) => {
      return !user.username.search(e.target.innerText);
    });
    const userObj = { ...user };
    this.setState({
      editUser: userObj[0],
    });
    this.customDialog.show();
  }

  onUserClick(e) {
    e.target.classList.toggle("active");
    ChairmanService.setUserRole(e.target.innerText).then((res) => {
      console.log(res);
    });
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

  removeModalUser() {
    this.setState({
      editUser: { id: "", username: "", email: "" },
    });
  }

  setModalUser(username) {}

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
      return (
        this.state.userSearch &&
        user.username.indexOf(this.state.userSearch) >= 0
      );
    });

    var myBigGreenDialog = {
      backgroundColor: "#00897B",
      color: "#ffffff",
      width: "70%",
      height: "600px",
      marginTop: "-300px",
      marginLeft: "-35%",
    };

    return (
      <div className="container">
        <p style={{ fontSize: "24px" }}>Lista korisnika:</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {this.state.users.map((user) => (
            <button
              type="button"
              style={{ display: "flex", flexGrow: "1", margin: "5px" }}
              className="btn btn-outline-dark btn-lg"
              key={user.id}
              onClick={this.onUserSelect}
            >
              {user.username}
            </button>
          ))}
        </div>

        <SkyLight
          afterClose={this.removeModalUser}
          dialogStyles={myBigGreenDialog}
          hideOnOverlayClicked
          ref={(ref) => (this.customDialog = ref)}
          title="Podaci o korisnicima"
        >
          <ModalUser user={this.state.editUser} />
        </SkyLight>
        <br />
        <br />

        <p style={{ fontSize: "24px" }}>
          Ukupan broj predanih radova: {this.state.papers.length}
        </p>
        <button
          className="btn btn-dark btn-block"
          onClick={this.downloadPapers}
        >
          Preuzmi sve radove
        </button>

        <br />
        <br />

        <p style={{ fontSize: "24px" }}>
          Pretraži korisnike i pridodaj ulogu recenzenta
        </p>
        <div className="form-group col-md-6">
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
