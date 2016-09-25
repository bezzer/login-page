import React from "react";
// Keep form elements stateless
const Input = (props) => {
  return <input type={props.type || "text"} className="lp-input" placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>;
}

export default Input;