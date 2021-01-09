import React, { Component } from "react";

import SkyLight from "react-skylight";
import ConferencePapers from "./conferencePapers";

export default class conferenceDetails extends Component {
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

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.customDialog.show();
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

    const papersToSend = this.props.papers.filter((paper) => {
      return paper.section === this.props.section;
    });

    return (
      <div className="card" style={{ background: "transparent" }}>
        <div
          className="card-header"
          style={{
            fontSize: "30px",
            padding: "0px",
            background: "transparent",
            textAlign: "right",
            border: "0",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {this.props.section}
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "25px" }}>
            {this.props.title}
          </h5>
          <p className="card-text">{this.props.description}</p>
          <a className="btn btn-primary" onClick={this.onClick}>
            Pregledajte primljene radove
          </a>
          <SkyLight
            afterClose={this.removeModalReviews}
            dialogStyles={myBigGreenDialog}
            hideOnOverlayClicked
            ref={(ref) => (this.customDialog = ref)}
            title={this.state.paperToSee.title}
          >
            <ConferencePapers papers={papersToSend} />
          </SkyLight>
        </div>
      </div>
    );
  }
}
