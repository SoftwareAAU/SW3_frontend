import { Container, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import siteLogo from "../assets/logo.svg";

import * as Icon from 'react-bootstrap-icons';

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
        <NavLink to="/" className="sidebar-logo mx-auto d-flex flex-row align-items-center">
          <img src={siteLogo} height="70px" alt="LOGO" />
          Frankly Insure
        </NavLink>
        <hr></hr>
        <div className="sidebar-links text-align-left my-auto mx-auto">
          <NavLink to="/customers" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <Icon.People className="icon-colors" /> Customer</div>
          </NavLink>
          <NavLink to="/claims" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <Icon.Bookmarks className="icon-colors" /> Claims</div>
          </NavLink>
          <NavLink to="/coverages" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <Icon.Clipboard className="icon-colors" />  Coverages</div>
          </NavLink>
          <NavLink to="/create/customer" className="link"> 
          <div className="link d-flex flex-row align-items-center gap-2 active"> <Icon.PersonPlus className="icon-colors" /> Create customer</div>
          </NavLink>
          <NavLink to="/policies" className="link">
          <div className="link d-flex flex-row align-items-center gap-2 active"> <Icon.CardList className="icon-colors" /> Policies</div>
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
