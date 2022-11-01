import { Container, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import siteLogo from "../assets/siteLogo.svg";
import { Link } from "react-router-dom";
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
        <Link to="/" className="sidebar-logo mx-auto">
          <img src={siteLogo} height="70px" alt="LOGO" />
          Frankly Insure
        </Link>
        <hr></hr>
        <div className="sidebar-links text-center">
          <Link to="/" className="link">
            Dashboard
          </Link>
          <Link to="/customers" className="link">
            Customers
          </Link>
          <Link to="/analytics" className="link">
            Analytics
          </Link>
        </div>

        
      </Stack>
      <Row className="sign-out-box">
          <button onClick={signOut} className="btn-primary sign-out-button" >Sign out</button>
          </Row>
    </Col>
  );
};

export default Sidebar;
