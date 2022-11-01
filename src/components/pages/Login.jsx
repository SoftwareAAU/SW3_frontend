import Axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import "./Login.css";

import girl from "../../assets/girl.png";

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
    <div className="login row">
      <div className="col-8">
        <img className="loginImage" src={girl}></img>
      </div>
      <div className="col-4">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input
            type="email"
            class="form-control"
            onChange={handleUsernameChange}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
