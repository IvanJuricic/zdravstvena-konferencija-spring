import React, { useState, StyleSheet } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { PDFViewer } from "react-view-pdf";
import ReviewerService from "../services/reviewerService";

function submitData(paperId, reviewerId, comment, isAccepted) {
  ReviewerService.addReview(
    paperId,
    reviewerId,
    comment,
    isAccepted
  ).then((res) => console.log("Proslo", res));
}

export default function ModalPaperPreview(props) {
  const [comment, setComment] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

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
            <div
              style={{
                display: "flex",
                margin: "0 auto",
                padding: "5px",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <input
                type="checkbox"
                className="form-check-input"
                id="approved"
                value={isAccepted}
                onChange={(e) => {
                  setIsAccepted(e.target.checked);
                }}
              />
              <label className="form-check-label" htmlFor="approved">
                Potvrditi rad?
              </label>
            </div>
            <button
              className="btn btn-success"
              style={{ marginTop: "10px" }}
              type="button"
              onClick={() => {
                submitData(
                  props.paper.id,
                  props.reviewer.id,
                  comment,
                  isAccepted
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
