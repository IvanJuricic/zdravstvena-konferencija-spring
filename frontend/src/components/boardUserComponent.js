import React, { useState, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import UserService from "../services/userService";
import PaperService from "../services/paperService";

import { storage } from "../firebase";
import button from "react-validation/build/button";

export default function BoardUser(props) {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");

  const handleSave = (e) => {
    const file = e.target.files[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const fileName = file.name;
    const storageRef = storage.ref("papers");
    const fileRef = storageRef.child(fileName);

    fileRef.put(file).then(() => {
      fileRef.getDownloadURL().then((res) => {
        PaperService.uploadPaper(res, fileName).then(() =>
          PaperService.sendConfEmail(user.email).then((res) => console.log(res))
        );
      });
    });
  };

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent("Greska!");
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

      <label>Objavite svoj rad:</label>
      <Form>
        <label>
          Privitak
          <Input
            type="file"
            className="form-control"
            name="fileName"
            onChange={handleSave}
          />
        </label>
      </Form>
    </div>
  );
}
