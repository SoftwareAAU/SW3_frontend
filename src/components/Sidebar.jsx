import { Container, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";

import siteLogo from "../assets/sitelogo.svg";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Col className="sidebar p-5">
      <Stack direction="vertical" className="links" gap={3}>
        <a href="/" className="sidebar-logo mx-auto">
          <img src={siteLogo} height="50px" alt="LOGO" />
          Frankly Insure
        </a>

        <div className="sidebar-links text-center">
          <a className="link" href="">
            Dashboard
          </a>
          <a className="link" href="">
            Dashboard
          </a>
          <a className="link" href="">
            Dashboard
          </a>
        </div>
      </Stack>
    </Col>
  );
};

export default Sidebar;
