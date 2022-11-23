import { Container, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import siteLogo from "../assets/logo.svg";

import dashboardLogo from "../assets/speed.png";
import customerLogo from "../assets/client.png";
import analyticsLogo from "../assets/chart.png";
import claimsLogo from "../assets/claims.png";
import coverageLogo from "../assets/claims.png";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Cookies from "js-cookie";

const Sidebar = () => {
  function signOut() {
    Cookies.remove("token");
    window.location.href = "/";
  }
  return (

    <Col className="sidebar p-5 d-flex flex-column align-items-start">
      <Stack direction="vertical" className="links">
        <NavLink to="/" className="sidebar-logo mx-auto">
          <img src={siteLogo} height="70px" alt="LOGO" />
          Frankly Insure
        </NavLink>
        <hr></hr>
        <div className="sidebar-links text-align-left my-auto mx-auto">
          <NavLink to="/dashboard" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <img class="image" src={dashboardLogo} alt="DASHBOARD" /> Dashboard</div>
          </NavLink>
          <NavLink to="/customers" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <img class="image" src={customerLogo} alt="CUSTOMERS" /> Customer</div>
          </NavLink>
          <NavLink to="/claims" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <img class="image" src={claimsLogo} alt="CHART" /> Claims</div>
          </NavLink>
          <NavLink to="/coverages" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <img class="image" src={coverageLogo} alt="CHART" /> Coverages</div>
          </NavLink>
          <NavLink to="/analytics" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <img class="image" src={analyticsLogo} alt="CHART" /> Analytics</div>
          </NavLink>
          <NavLink to="/create/customer" className="link">
            Create Customer
          </NavLink>
          <NavLink to="/policies" className="link">
            Policies
          </NavLink>
        </div>
      </Stack>
      <Row className="sign-out-box">
          <h1 className="fw-normal cd-first-name">
                Carl
              </h1>
              <h1 className="fw-normal cd-surname">
                Røvhulsskov
              </h1>
              <button onClick={signOut} className="btn-primary sign-out-button">
              Sign out
        </button>
      </Row>
    </Col>
  );
};

export default Sidebar;
