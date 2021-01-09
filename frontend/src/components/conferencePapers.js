import React from "react";
/**/
export default function conferencePapers(props) {
  return (
    <div>
      {props.papers.map((paper) => (
        <p>{paper.title}</p>
      ))}
    </div>
  );
}
