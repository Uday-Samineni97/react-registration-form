// Created by Uday Samineni
// on 08-04-2020

import React, { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import checkValidity from "../Validations/FormValidation";
import background from "../assets/backgound.jpg";
// import facebook from "../assets/facebook.png";
// import twitter from "../assets/twitter.png";
import google from "../assets/google.png";
import "./index.css";
import FacebookLoginBtn from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import TwitterLogin from "react-twitter-login";

const Form = () => {
  const [auth, setAuth] = useState(false);
  // const [email, setEmail] = useState();
  // const [name, setName] = useState();
  const [RegisterForm, setRegisterForm] = useState({
    firstname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name"
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true
      },
      errorMessage: "First Name is a required Field*"
    },
    lastname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last Name"
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true
      },
      errorMessage: "Last Name is a required Field*"
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Email"
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
        match: ""
      },
      errorMessage: "Email is a required Field*"
    },
    Phone: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phone"
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true,
        maxLength: 10
      },
      errorMessage: "Phone is a required Field*"
    },
    Password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      valid: false,
      touched: false,
      validation: {
        required: true
      },
      errorMessage: "Password is a required Field*"
    }
  });
  const componentClicked = () => {
    console.log("Facebook button clicked");
  };
  const responseFacebook = response => {
    console.log("Facebook Response clicked", response);
  };
  const responseGoogle = response => {
    console.log("Google Response clicked", response);
  };
  const authHandler = response => {
    console.log("Twitter Response clicked", response);
  };
  let facebookdata;
  auth
    ? (facebookdata = <div>Hi!</div>)
    : (facebookdata = (
        <FacebookLoginBtn
          appId="272736910391140"
          autoLoad={false}
          fields="name,email"
          onClick={componentClicked}
          callback={responseFacebook}
          cssClass="facebook-button-class"
          textButton="facebook"
        />
      ));
  let googledata;
  auth
    ? (googledata = <div>Hi!</div>)
    : (googledata = (
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          render={renderProps => (
            <button className="google-button-class">
              <img
                src={google}
                alt="oops..."
                height="20"
                width="20"
                style={{ marginBottom: "2.5px" }}
              />
              Google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      ));
  let twitterdata;
  auth
    ? (twitterdata = <div>Hi!</div>)
    : (twitterdata = (
        <div>
          <TwitterLogin
            buttonTheme="dark_short"
            className="twitter_bt"
            authCallback={authHandler}
            // consumerKey={CONSUMER_KEY}
            // consumerSecret={CONSUMER_SECRET}
            // callbackUrl={CALLBACK_URL}
          />
        </div>
      ));

  let FormElements = [];
  for (let key in RegisterForm) {
    FormElements.push({
      id: key,
      config: RegisterForm[key]
    });
  }

  let Form = (
    <form>
      {FormElements.map(item => (
        <Input
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          value={item.value}
          key={item.id}
          invalid={!item.config.valid}
          shouldValidate={item.config.validation}
          touched={item.config.touched}
          errorMessage={item.config.errorMessage}
          changed={e => {
            inputChangeHandler(e, item.id);
          }}
        />
      ))}
    </form>
  );
  const inputChangeHandler = (event, inputIdentifier) => {
    console.log("Event", event.target.value);
    const updatedForm = {
      ...RegisterForm
    };
    const updatedFormElement = {
      ...RegisterForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    setRegisterForm(updatedForm);
  };
  const handleSubmit = () => {
    console.log("Hello");
    let valid = true;
    let updated = {
      ...RegisterForm
    };
    for (let key in updated) {
      updated[key].touched = true;
      valid = updated[key].valid && valid;
    }
    console.log("Hellov", valid);
    if (!valid) {
      setRegisterForm(updated);
    }
  };
  return (
    <div>
      <Container>
        <div className="main_div">
          <div className="container_class">
            <Row>
              <div>
                <img
                  src={background}
                  className="img_class"
                  width="420"
                  height="610"
                  alt="oops..."
                />
              </div>
              <div className="Form">
                <h3 className="heading">Register</h3>
                {Form}
                <Button handleSubmit={handleSubmit} title="Sign Up" />
                <div className="social_logins">
                  {/* <Button className="social_bt" title="Facebook" /> */}
                  <div>{facebookdata}</div>
                  <div>{googledata}</div>
                  {/* <label for="twitter_bt">
                    <img
                      onClick={() => {
                        document.querySelector('#twitter_bt').click(); 
                      }}
                      src={twitter}
                      alt="oops..."
                      height="45"
                      width="45"
                    />
                  </label> */}
                {twitterdata}
                </div>
              </div>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Form;
