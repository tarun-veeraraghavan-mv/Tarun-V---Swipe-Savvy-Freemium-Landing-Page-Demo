import React from "react";

export default function StepProgressBar({ progress }) {
  return (
    <div style={{ marginBottom: "35px" }}>
      <p>Step {progress} of 3</p>
      <progress
        value={progress}
        max="3"
        style={{
          width: "100%",
          transition: "width 0.3s ease-in-out",
        }}
        className="progress"
      ></progress>
    </div>
  );
}
