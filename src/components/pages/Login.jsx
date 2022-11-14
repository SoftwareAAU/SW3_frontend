import Axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import "./Login.css";

import {Row, Col} from 'react-bootstrap'

//imports ip
import globals from "../../globals";

import girl from "../../assets/girl2.png";

import siteLogo from "../../assets/logo.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    
    var bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    
    Axios({
      method: "post",
      url: globals.ip + "/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      const { status, token } = res.data;

      if (status === true) {
        Cookies.set("token", token);
        window.location.href = "/";
        return;
      }

      console.log(res.data);

      alert("Wrong username or password");
    });
  }

  //handle change for username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //handle change for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="row">
    
      <div className=" left-side col overflow-hidden">
      <img src={girl} className="login-image" alt="" />
      </div>
     
        <div className="right-side col col-4 d-flex flex-column align-items-center justify-content-center">
          
        
        <div className="login-logo">
              <img src={siteLogo} alt="LOGO" width={120} />
              <p className="login-logo-text">Frankly Insure</p>
            </div>

            <div className="mb-3 px-5 login-form-group ">
              <input type="text" className="form-control" onChange={handleUsernameChange} placeholder="Enter username" onKeyPress={(e) => { if (e.key === "Enter") { login(); }}}
              />
            </div>
            <div className="mb-2 px-5 login-form-group">
              <input type="password" className="form-control" onChange={handlePasswordChange} placeholder="Enter password" onKeyPress={(e) => { if (e.key === "Enter") { login(); }}}/>
            </div>
            <button type="submit" className="sign-in-button" onClick={login}>
              Sign in
            </button>

        </div>
        </div>
     
    </div>

  );
};

export default Login;
