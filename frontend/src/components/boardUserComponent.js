import React, { Component } from "react";

import SkyLight from "react-skylight";
import ModalPaperData from "./modalPaperData";

import AdminService from "../services/adminService";
import PaperService from "../services/paperService";
import UserService from "../services/userService";

import { storage } from "../firebase";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      userSearch: "",
      paperSearch: "",
      selectedUser: null,
      selectedPaper: null,
      paperToSee: { id: "", title: "", reviews: [], isAccepted: false },
      users: [],
      papers: [],
      reviews: [],
      reviewer: { id: "", username: "" },
    };

    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.onPaperClick = this.onPaperClick.bind(this);
    this.onAddPaperToUser = this.onAddPaperToUser.bind(this);
    this.removeModalReviews = this.removeModalReviews.bind(this);
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
        PaperService.uploadPaper(res, fileName, user.id)
          .then((response) => {
            response.data.message === "New Paper Added"
              ? this.setState({
                  papers: [...this.state.papers, response.data],
                })
              : console.log("Updatean rad");
          })
          .catch(() => {
            console.log("Greska");
          });
      });
    });
  }

  /* Odabir rada kojeg želimo pregledati */
  onSelect(e) {
    const paper = this.state.papers.filter((paper) => {
      return paper.title.search(e.target.innerText) >= 0;
    });

    UserService.getPaperData(paper[0].id).then((res) => {
      this.setState({
        paperToSee: { ...res.data },
      });
      UserService.getPaperReviews(res.data.id).then((resp) => {
        this.setState({
          reviews: [...this.state.reviews, ...resp.data],
        });
        this.customDialog.show();
      });
    });
  }

  /* Odabir korisnika kojem želimo pridodati rad */
  onUserClick(e) {
    const user = this.state.users.filter((user) => {
      return user.username.search(e.target.innerText) >= 0;
    });
    e.target.classList.toggle("active");
    this.setState({
      selectedUser: { ...user[0] },
    });
  }

  /* Odabir rada kojeg želimo pridodati korisniku */
  onPaperClick(e) {
    const paper = this.state.papers.filter((paper) => {
      return paper.title.search(e.target.innerText) >= 0;
    });
    e.target.classList.toggle("active");
    console.log(paper);
    this.setState({
      selectedPaper: { ...paper[0] },
    });
  }

  removeModalReviews(e) {
    this.setState({
      reviews: [],
      reviewer: { id: "", username: "" },
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onAddPaperToUser(e) {
    AdminService.setAuthor(
      this.state.selectedUser.id,
      this.state.selectedPaper.title
    ).then((res) => {
      console.log("Vrh");
    });
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
    var myBigGreenDialog = {
      backgroundColor: "#00897B",
      color: "#ffffff",
      width: "70%",
      height: "650px",
      marginTop: "-300px",
      marginLeft: "-35%",
      overflowX: "hidden",
      padding: "20px",
    };
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
            {this.state.papers.map((paper) =>
              paper.status === "accept" ||
              paper.status === "acceptMinorChanges" ? (
                <button
                  type="button"
                  style={{ flexGrow: "1", margin: "5px" }}
                  className="btn btn-success btn-lg"
                  key={paper.id}
                  onClick={this.onSelect}
                >
                  {paper.title}
                </button>
              ) : paper.status === "decline" ? (
                <button
                  type="button"
                  style={{ flexGrow: "1", margin: "5px" }}
                  className="btn btn-danger btn-lg"
                  key={paper.id}
                  onClick={this.onSelect}
                >
                  {paper.title}
                </button>
              ) : paper.status === "pending" ? (
                <button
                  type="button"
                  style={{ flexGrow: "1", margin: "5px" }}
                  className="btn btn-outline-warning btn-lg"
                  key={paper.id}
                  onClick={this.onSelect}
                >
                  {paper.title}
                </button>
              ) : (
                <button
                  type="button"
                  style={{ flexGrow: "1", margin: "5px" }}
                  className="btn btn-outline-dark btn-lg"
                  key={paper.id}
                  onClick={this.onSelect}
                >
                  {paper.title}
                </button>
              )
            )}
          </div>
        </div>
        <SkyLight
          afterClose={this.removeModalReviews}
          dialogStyles={myBigGreenDialog}
          hideOnOverlayClicked
          ref={(ref) => (this.customDialog = ref)}
          title={this.state.paperToSee.title}
        >
          <ModalPaperData
            paper={this.state.paperToSee}
            reviews={this.state.reviews}
          />
        </SkyLight>
        <br />
        <div className="custom-file">
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

        <div className="form-row">
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
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Znanstveni rad</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              name="paperSearch"
              value={this.state.paperSearch}
              autoComplete="off"
              onChange={this.onChange}
              style={{ margin: "5px" }}
            />
            {paperNames.map((paper) => (
              <button
                type="button"
                className="btn btn-outline-dark"
                aria-pressed="true"
                key={paper.id}
                onClick={this.onPaperClick}
                style={{ margin: "2px" }}
              >
                {paper.title}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-dark"
            style={{ margin: "0 auto" }}
            onClick={this.onAddPaperToUser}
          >
            Dodaj
          </button>
        </div>

        <br />
      </div>
    );
  }
}
