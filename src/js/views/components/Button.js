import React from "react";
// Keep form elements stateless
const Button = (props) => {
  var classes = "lp-btn" + (props.loading ? " lp-btn-loading" : "");
  return <button onClick={props.onClick} className={classes}>
    {props.title}
  </button>;
}

export default Button;