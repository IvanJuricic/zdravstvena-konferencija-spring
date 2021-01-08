import React, { useEffect, useState } from "react";

export default function ModalPaperData(props) {
  return (
    <div className="container">
      <br />
      <h3 style={{ borderBottom: "solid 1px white", paddingBottom: "10px" }}>
        Recenzije
      </h3>
      {props.reviews.map((review) => (
        <div
          key={review.id}
          className="card border-dark mb-3"
          style={{ display: "flex" }}
        >
          <div
            className="card-body text-dark"
            style={{ flex: "1", fontSize: "22px", overflowWrap: "anywhere" }}
          >
            <p className="card-text">{review.comment}</p>
          </div>
        </div>
      ))}
      <h1 style={{ textAlign: "center" }}>
        {props.paper.status === "accept" ||
        props.paper.status === "acceptMinorChanges" ? (
          <span className="badge badge-pill badge-success">Prihvaćeno</span>
        ) : null}
        {props.paper.status === "decline" ? (
          <span className="badge badge-pill badge-danger">Odbijeno</span>
        ) : null}
        {props.paper.status === "pending" ? (
          <span className="badge badge-pill badge-warning">
            Potrebne izmjene
          </span>
        ) : props.paper.status === "No review" ? (
          <span className="badge badge-pill badge-info">Nema recenzije</span>
        ) : null}
      </h1>
    </div>
  );
}
