import Axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import "./Login.css";

import girl from "../../assets/girl2.png";

import siteLogo from "../../assets/sitelogo.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    console.log(username, password);
    Axios.post("http://130.225.39.66:8080/login", {
      username: username,
      password: password,
    }).then((res) => {
      const { status, token } = res.data;

      if (status === true) {
        Cookies.set("token", token);
        window.location.href = "/";
        return;
      }

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
        <div className="col-8 login-image-div">
          <img className="login-image" src={girl}></img>
        </div>

        <div className="col-4 d-flex flex-column justify-content-center align-items-center ">
          <div className="login-logo">
            <img src={siteLogo} alt="LOGO" width={120} />
            <p className="login-logo-text">Frankly Insure</p>
          </div>

          <div class="mb-3 login-form-group ">
            <input
              type="text"
              className="form-control"
              onChange={handleUsernameChange}
              placeholder="Enter username"
              //login if enter is pressed
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
            />
          </div>
          <div class="mb-2 login-form-group">
            <input
              type="password"
              className="form-control"
              onChange={handlePasswordChange}
              placeholder="Enter password"
              //login if enter is pressed
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
            />
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
