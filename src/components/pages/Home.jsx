import { Container, Row, Col } from "react-bootstrap";

import MainSection from "../page-components/MainSection";
import Sidebar from "../Sidebar";

const Home = () => {
  return (
    <>
      <Row className="page">
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col sm={9}>
          <MainSection />
        </Col>
      </Row>
    </>
  );
};

export default Home;
