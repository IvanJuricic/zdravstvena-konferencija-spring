import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";

import AdminService from "../services/adminService";
import PaperService from "../services/paperService";

import { storage } from "../firebase";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      userSearch: "",
      paperSearch: "",
      selectedUser: "",
      selectedPaper: null,
      users: [],
      papers: [],
    };

    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onPaperClick = this.onPaperClick.bind(this);
  }

  /* Predavanje rada */
  handleSave(e) {
    const file = e.target.files[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const fileName = file.name;
    const storageRef = storage.ref("papers");
    const fileRef = storageRef.child(fileName);
    /*PaperService.sendConfEmail(user.email).then(() => {
            this.setState({
              papers: [...this.state.papers, file.name],
            });
          })*/
    fileRef.put(file).then(() => {
      fileRef.getDownloadURL().then((res) => {
        PaperService.uploadPaper(res, fileName, user.id).then((response) => {
          this.setState({
            papers: [...this.state.papers, response.data],
          });
        });
      });
    });
  }

  /* Odabir rada kojeg želimo pridodati korisniku */
  onSelect(e) {
    this.setState({
      selectedPaper: e.target.innerText,
    });
  }

  /* Odabir korisnika kojem želimo pridodati rad */
  onClick(e) {
    const user = this.state.users.filter((user) => {
      return !user.username.search(e.target.innerText);
    });

    const userObj = { ...user };

    AdminService.setAuthor(
      userObj[0].id,
      this.state.selectedPaper
    ).then((res) => console.log("Rad dodan autoru", { res }));
  }

  onPaperClick(e) {
    e.target.classList.toggle("active");
    console.log(e.target.classList);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    AdminService.getAllUsers().then((response) => {
      this.setState({
        users: response.data,
      });
      const user = JSON.parse(localStorage.getItem("user"));
      PaperService.getUserPapers(user.id).then((res) => {
        this.setState({
          papers: [...this.state.papers, ...res.data],
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

    const paperNames = this.state.papers.filter((paper) => {
      return (
        this.state.paperSearch &&
        paper.title.indexOf(this.state.paperSearch) >= 0
      );
    });
    return (
      <div className="container">
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "25px" }}>Popis vaših radova:</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.state.papers.map((paper) => (
              <button
                type="button"
                style={{ display: "flex", flexGrow: "1", margin: "5px" }}
                className="btn btn-outline-dark btn-lg"
                key={paper.id}
                onClick={this.onSelect}
              >
                {paper.title}
              </button>

              /*<div
                class="col-sm-8"
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  background: "#F8F8F8",
                  border: "solid #BDBDBD 1px",
                  boxShadow: "7px 7px 6px rgba(0, 0, 0, 0.1)",
                  WebkitBoxShadow: "7px 7px 6px rgba(0, 0, 0, 0.1)",
                  MozBoxShadow: "7px 7px 6px rgba(0, 0, 0, 0.1)",
                }}
                key={paper.id}
                onClick={this.onSelect}
              >
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{paper.title}</h5>
                  </div>
                </div>
              </div>*/
            ))}
          </div>
        </div>
        <br />

        {/*
        <label>Objavite svoj rad:</label>
        <Form>
          <label>
            Privitak
            <Input
              type="file"
              className="form-control"
              name="fileName"
              onChange={this.handleSave}
            />
          </label>
        </Form>*/}
        <div class="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            name="fileName"
            onChange={this.handleSave}
          />
          <label className="custom-file-label" htmlFor="customFile">
            Kliknite da biste dodali rad...
          </label>
        </div>

        <br />
        <br />
        <br />

        <label style={{ fontSize: "25px" }}>
          Pronađi korisnika i pridodaj ga kao autora odabranog rada:
        </label>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label htmlFor="inputEmail4">Korisničko ime</label>
            <input
              type="text"
              class="form-control"
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
                class="btn btn-outline-dark"
                aria-pressed="true"
                key={user.id}
                onClick={this.onClick}
                style={{ margin: "2px" }}
              >
                {user.username}
              </button>
            ))}
          </div>
          <div class="form-group col-md-6">
            <label htmlFor="inputPassword4">Znanstveni rad</label>
            <input
              type="text"
              class="form-control"
              id="inputPassword4"
              name="paperSearch"
              value={this.state.paperSearch}
              autoComplete="off"
              onChange={this.onChange}
              style={{ margin: "5px" }}
            />
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              {paperNames.map((paper) => (
                <label
                  className="btn btn-outline-dark"
                  key={paper.id}
                  onClick={this.onPaperClick}
                  style={{ margin: "2px" }}
                >
                  <input type="radio" name="options" autoComplete="off" />
                  {paper.title}
                </label>
              ))}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
