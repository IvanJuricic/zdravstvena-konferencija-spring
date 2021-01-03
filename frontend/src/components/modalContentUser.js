import React, { useState } from "react";

import ChairmanService from "../services/chairmanService";

function submitData(id, username) {
  console.log(id, username);
  ChairmanService.editUserData(id, username).then((res) => console.log(res));
}

export default function ModalContentUser(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form>
        <div className="form-group">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">
                ID
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="search"
              autoComplete="off"
              value={props.user.id}
              style={{ fontSize: "20px" }}
              disabled={true}
            />
          </div>

          <br />
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">
                Korisničko ime
              </span>
            </div>
            <input
              type="text"
              placeholder={props.user.username}
              className="form-control"
              name="search"
              autoComplete="off"
              value={username}
              style={{ fontSize: "20px" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <br />
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">
                Email
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="search"
              autoComplete="off"
              style={{ fontSize: "20px" }}
              value={props.user.email}
            />
          </div>

          <br />
        </div>
      </form>

      <button
        className="btn btn-dark"
        onClick={() => {
          submitData(props.user.id, username);
          setUsername("");
        }}
      >
        Submit changes
      </button>
    </div>
  );
}
