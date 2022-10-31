import { Container, Row, Col, } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

import siteLogo from '../assets/sitelogoblue.png';

import "./Sidebar.css";

const Sidebar = () => {
  return (
    
      <Col className='sidebar my-4'>
        <Stack direction="vertical" className='links' gap={3}>
          <a href="/" className='navbar-logo mx-auto'><img src={siteLogo} height="50px" alt="LOGO" /></a>

          <Row className="mx-auto">
          <a href="">Dashboard</a>
          </Row>
          <Row className="mx-auto">
          <a href="">Dashboard</a>
          </Row>
          <Row className="mx-auto">
          <a href="">Dashboard</a>
          </Row>
       
       

        </Stack>
      </Col>
  );
}
 
export default Sidebar;