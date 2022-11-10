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
        <div className="sidebar-links text-left">
          <NavLink to="/dashboard" className="link">
          <i class="fa fa-compass"> Dashboard</i>
          
          </NavLink>
          <NavLink to="/customers" className="link">
          <i class="fa fa-users"> Customers</i>

          </NavLink>
          <NavLink to="/analytics" className="link">
          <i class="fa fa-pie-chart" aria-hidden="true"> Analytics</i>
          </NavLink>
          <NavLink to="/create/customer" className="link">
            Create Customer
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
