import { Container, Row, Col, } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

import siteLogo from '../assets/sitelogoblue.png';

import "./Sidebar.css";

const Sidebar = () => {
  return (
    
      <Col className='sidebar my-4'>
        <Stack direction="vertical" gap={3}>
          <a href="/" className='navbar-logo'><img src={siteLogo} height="50px" alt="LOGO" /></a>
          <a href="" className="ms-auto">Dashboard</a>
          <a href="" className="ms-auto">Customers</a>
          <a href="" className="ms-auto">Analytics</a>
        </Stack>
      </Col>
  );
}
 
export default Sidebar;