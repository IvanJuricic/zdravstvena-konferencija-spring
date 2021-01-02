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
        {props.paper.isAccepted ? (
          <span className="badge badge-pill badge-success">Prihvaćeno</span>
        ) : (
          <span className="badge badge-pill badge-danger">Odbijeno</span>
        )}
      </h1>
    </div>
  );
}
