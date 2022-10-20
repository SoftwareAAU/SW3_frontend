import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../Navbar';

const Home = () => {
  return (
    <Container>
      <Navbar/>
      <Row>
        <Col>
          <h1>Benjamin har lange løg</h1>
        </Col>
      </Row>
    </Container>
  );
}
 
export default Home;