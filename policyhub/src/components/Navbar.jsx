import { Container, Row, Col, } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

import siteLogo from '../assets/sitelogoblue.png';

import "./Navbar.css";

const Navbar = () => {
  return (
    <Row className='py-3 navbar'>
      <Col>
        <Stack direction="horizontal" gap={3}>
          <a href="/" className='navbar-logo'><img src={siteLogo} height="50px" alt="LOGO" /></a>
          <a href="" className="ms-auto">ABOUT US</a>
        </Stack>
      </Col>
    </Row>
  );
}
 
export default Navbar;