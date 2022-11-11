import { Container, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import siteLogo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Cookies from "js-cookie";

const Sidebar = () => {
  function signOut() {
    Cookies.remove("token");
    window.location.href = "/";
  }
  return (
    <Col className="sidebar p-5">
      <Stack direction="vertical" className="links" gap={3}>
        <NavLink to="/" className="sidebar-logo mx-auto">
          <img src={siteLogo} height="70px" alt="LOGO" />
          Frankly Insure
        </NavLink>
        <hr></hr>
        <div className="sidebar-links text-center">
          <NavLink to="/dashboard" className="link">
            Dashboard
          </NavLink>
          <NavLink to="/customers" className="link">
            Customers
          </NavLink>
          <NavLink to="/analytics" className="link">
            Analytics
          </NavLink>
          <NavLink to="/create/customer" className="link">
            Create Customer
          </NavLink>
          <NavLink to="/create/policy" className="link">
            Create Policy
          </NavLink>
        </div>
      </Stack>
      <Row className="sign-out-box">
        <button onClick={signOut} className="btn-primary sign-out-button">
          Sign out
        </button>
      </Row>
    </Col>
  );
};

export default Sidebar;
