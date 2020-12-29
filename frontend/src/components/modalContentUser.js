import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

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
      <Form>
        <div className="form-group">
          <Input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            value={props.userToEdit.id}
          />
          <br />
          <Input
            type="text"
            placeholder={props.userToEdit.username}
            className="form-control"
            name="search"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {}
          <br />
          <Input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            value={props.userToEdit.email}
          />
          <br />
        </div>
      </Form>

      <button onClick={() => submitData(props.userToEdit.id, username)}>
        Submit changes
      </button>
    </div>
  );
}
