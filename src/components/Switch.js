
import React from "react";

const Switch = (props) => {
  return (
    <div className="align-center">
      <label className="switch">
        <input
          onChange={() => props.toggleFormat()}
          checked={props.degree}
          type="checkbox"
        ></input>
        <span className="slider round align-center">
          <div
            style={{
              display: "flex",
              gap: "20px",
              color: "black",
              zIndex: 2,
              position: "relative",
              fontSize: "12px",
            }}
          >
            <span>C</span>
            <span>F</span>
          </div>
        </span>
      </label>
    </div>
  );
};

export default Switch;
