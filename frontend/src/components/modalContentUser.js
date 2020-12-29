import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

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
            className="form-control"
            name="search"
            autoComplete="off"
            value={props.userToEdit.username}
          />
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
    </div>
  );
}
