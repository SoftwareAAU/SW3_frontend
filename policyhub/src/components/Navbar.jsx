import { Container, Row, Col, } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

import siteLogo from '../assets/sitelogo.png';


const Navbar = () => {
  return (
    <Row className='py-3'>
      <Col>
        <Stack direction="horizontal" gap={3}>
          <a href="/" className='navbar-logo'><img src={siteLogo} height="50px" alt="LOGO" /></a>
          <a href="" className="ms-auto">About Us</a>
        </Stack>
      </Col>
    </Row>
  );
}
 
export default Navbar;