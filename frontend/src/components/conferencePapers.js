import React, { useState, useEffect } from "react";
import { PDFViewer } from "react-view-pdf";
/**/
export default function ConferencePapers(props) {
  const [selectedPaper, setSelectedPaper] = useState("");

  const onClick = (e) => {
    const paper = props.papers.filter((paper) => {
      return paper.title === e.target.innerText;
    });
    setSelectedPaper(paper[0].url);
  };

  return (
    <div style={{ display: "flex", marginTop: "30px" }}>
      <div
        style={{
          height: "100%",
          width: "70%",
          position: "relative",
          top: "50%",
          margin: "0 auto",
        }}
      >
        <PDFViewer url={selectedPaper} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
        {props.papers.map((paper) => (
          <p
            style={{ fontSize: "15px", height: "fit-content" }}
            onClick={onClick}
            className="btn btn-light"
          >
            {paper.title}
          </p>
        ))}
      </div>
    </div>
  );
}
