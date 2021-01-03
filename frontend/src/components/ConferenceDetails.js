import React, { Component } from "react";

export default function ConferenceDetails(props) {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href="#" className="btn btn-primary">
          Button
        </a>
      </div>
    </div>
  );
}
