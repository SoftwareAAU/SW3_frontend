import { Container, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import siteLogo from "../assets/sitelogo.svg";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Col className="sidebar p-5">
      <Stack direction="vertical" className="links" gap={3}>
        <Link to="/" className="sidebar-logo mx-auto">
          <img src={siteLogo} height="50px" alt="LOGO" />
          Frankly Insure
        </Link>

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
    </Col>
  );
};

export default Sidebar;
