import React from "react";

import "./styles/basicStatView.css";

const BasicStatView = (props) => (
  <div className="basicStatViewWrapper">
    <p style={{ color: props.color }} className="basicStatViewNumber">
      {props.number}
    </p>
    <p className="basicStatViewLabel">{props.label}</p>
  </div>
);

export default BasicStatView;
