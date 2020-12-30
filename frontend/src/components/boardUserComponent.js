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
      search: "",
      selectedUser: "",
      selectedPaper: null,
      users: [],
      papers: [],
    };

    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
  }

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
          console.log("Uploadan rad sa backenda => ", response);
          this.setState({
            papers: [...this.state.papers, response.data],
          });
        });
      });
    });
  }

  onSelect(e) {
    this.setState({
      selectedPaper: e.target.innerText,
    });
  }

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
      return this.state.search && user.username.indexOf(this.state.search) >= 0;
    });
    return (
      <div className="container">
        <header className="jumbotron">
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
          </Form>
          <br />
          <br />
          <label>Popis radova:</label>
          {console.log("Zdravko", this.state.papers)}
          {this.state.papers.map((paper) => (
            <li key={paper.id} onClick={this.onSelect}>
              {paper.title}
            </li>
          ))}
          <br />
          <br />
          <Form>
            <div className="form-group">
              <label>
                Pronađi korisnika i pridodaj ga kao autora odabranog rada:
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
              <button className="btn btn-primary btn-block">
                Dodaj autora
              </button>
            </div>
          </Form>
          <br />
          <br />
        </header>
      </div>
    );
  }
}
