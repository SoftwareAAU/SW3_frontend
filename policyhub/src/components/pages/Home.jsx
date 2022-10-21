import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../Navbar';
import MainSection from '../page-components/MainSection';

const Home = () => {
  return (
    <>
      <Container fluid>
        <Navbar/>
        <MainSection/>
      </Container>
    </>
  );
}
 
export default Home;