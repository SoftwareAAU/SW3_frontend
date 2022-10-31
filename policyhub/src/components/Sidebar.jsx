import { Container, Row, Col, } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

import siteLogo from '../assets/sitelogo.svg';

import "./Sidebar.css";

const Sidebar = () => {
  return (
    
      <Col className='sidebar my-4 p-5'>
        <Stack direction="vertical" className='links' gap={3}>

          <a href="/" className='sidebar-logo mx-auto'><img src={siteLogo} height="50px" alt="LOGO" />Frankly Insure</a>


          <Row className="mx-auto">
          <a className='link' href="">Dashboard</a>
          </Row>
          <Row className="mx-auto">
          <a className='link' href="">Dashboard</a>
          </Row>
          <Row className="mx-auto">
          <a className='link' href="">Dashboard</a>
          </Row>
       
       

        </Stack>
      </Col>
  );
}
 
export default Sidebar;