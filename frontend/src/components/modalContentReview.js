import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { PDFViewer } from "react-view-pdf";
//import ChairmanService from "../services/chairmanService";
/*
function submitData(id, username) {
  console.log(id, username);
  ChairmanService.editUserData(id, username).then((res) => console.log(res));
}
*/
export default function ModalContentReview(props) {
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
            value={props.paper.id}
            disabled={true}
          />
          <br />
          <Input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            value={props.paper.title}
            //onChange={(e) => setUsername(e.target.value)}
          />

          <br />
          <br />
        </div>
      </Form>
      <div style={{ position: "sticky", height: "200px" }}>
        <PDFViewer url={props.paper.url} />
      </div>

      <button onClick={() => console.log("Submited!")}>Submit changes</button>
    </div>
  );
}
