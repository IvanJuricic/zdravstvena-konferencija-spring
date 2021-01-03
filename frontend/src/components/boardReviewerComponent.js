import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";

import FileSaver from "file-saver";

import SkyLight from "react-skylight";
import ModalPaperPreview from "./modalPaperPreview";
import { PDFViewer } from "react-view-pdf";

import { storage } from "../firebase";

import AdminService from "../services/adminService";
import ChairmanService from "../services/chairmanService";
import ConferenceService from "../services/conferenceService";

export default class BoardReviewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      search: "",
      selectedUser: "",
      users: [],
      currentUser: JSON.parse(localStorage.getItem("user")),
      papers: [],
      paperToReview: { id: "", title: "", url: "" },
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.downloadPapers = this.downloadPapers.bind(this);
    this.onSelect = this.onSelect.bind(this);
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

  async onSelect(e) {
    const paper = this.state.papers.filter((paper) => {
      return !paper.title.search(e.target.innerText);
    });
    const paperObj = { ...paper };
    this.setState({
      paperToReview: paperObj[0],
    });
    await this.customDialog.show();
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

    return (
      <div className="container">
        <label style={{ fontSize: "25px", marginBottom: "10px" }}>
          Odaberite rad kojem želite dati recenziju:
        </label>
        {this.state.papers.map((paper) => (
          <div
            key={paper.id}
            onClick={this.onSelect}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <button
              className="btn btn-outline-dark"
              style={{ fontSize: "20px", margin: "5px" }}
            >
              {paper.title}
            </button>
          </div>
        ))}
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
        <SkyLight
          afterClose={this.removeModalUser}
          dialogStyles={myBigGreenDialog}
          hideOnOverlayClicked
          ref={(ref) => (this.customDialog = ref)}
          title={this.state.paperToReview.title}
        >
          <ModalPaperPreview
            paper={this.state.paperToReview}
            reviewer={this.state.currentUser}
          />
        </SkyLight>
      </div>
    );
  }
}
