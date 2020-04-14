import React from "react";

const Button=(props)=>{
    return(
        <div>
            <button className="Button" onClick={props.handleSubmit} >{props.title}</button>
        </div>
    )
}
export default Button;