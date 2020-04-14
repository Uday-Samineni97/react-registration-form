import React from "react";
import  "./Input.css";

const Input = props => {
  let inputElement = null;
  let inputClasses = ["InputElement"];
  let ValidationMsg="";

  // if (props.invalid && props.shouldValidate && props.touched) {
  //   inputClasses.push("Invalid");
  // }
  if(props.invalid && props.touched){
    ValidationMsg = props.errorMessage;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className="InputElement"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return <div>
    {inputElement}
  <p  className="error_msg">{ValidationMsg}</p>
  </div>;
};

export default Input;
