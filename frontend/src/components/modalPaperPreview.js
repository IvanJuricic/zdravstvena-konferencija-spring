import React, { useState, StyleSheet } from "react";
import Form from "react-validation/build/form";
import { PDFViewer } from "react-view-pdf";
import ReviewerService from "../services/reviewerService";

function submitData(paper, reviewerId, users, comment, status) {
  ReviewerService.addReview(paper, reviewerId, users, comment, status).then(
    (res) => {
      console.log("Tu smo", res.data);
    }
  );
}

export default function ModalPaperPreview(props) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("accept");

  return (
    <div>
      <Form>
        <div
          style={{
            padding: "20px",
            display: "flex",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "70%",
              position: "relative",
              top: "50%",
              margin: "0 auto",
            }}
          >
            <PDFViewer url={props.paper.url} />
          </div>
          <br />
          <div
            style={{
              position: "relative",
              margin: "0 auto",
              justifyContent: "space-around",
              flexDirection: "column",
              display: "flex",
              width: "20%",
            }}
          >
            <p style={{ fontSize: "20px" }}>Recenzija na rad:</p>
            <textarea
              style={{ height: "80%", marginBottom: "10px" }}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <select
              style={{ padding: "5px" }}
              className="custom-select"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="accept">Prihvati</option>
              <option value="acceptMinorChanges">
                Prihvati(manje izmjene)
              </option>
              <option value="pending">Prihvati(veće promjene)</option>
              <option value="decline">Odbij</option>
            </select>
            <button
              className="btn btn-success"
              style={{ marginTop: "10px" }}
              type="button"
              onClick={() => {
                setComment("");
                setStatus("accept");
                submitData(
                  props.paper,
                  props.reviewer.id,
                  props.users,
                  comment,
                  status
                );
              }}
            >
              Spremi recenziju
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
