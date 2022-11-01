import { Container, Row, Col } from 'react-bootstrap';

import MainSection from '../page-components/MainSection';
import Sidebar from '../Sidebar';

const Home = () => {
  return (
    <>
      <Container fluid className='mx-0'>
        <Row className='mx-0'>
          <Col sm={3}>
            <Sidebar/>  
          </Col>
          <Col sm={9}>
            <MainSection/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
 
export default Home;