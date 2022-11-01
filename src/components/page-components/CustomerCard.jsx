import "./CustomerCard.css";
import { Container, Row, Col } from "react-bootstrap";

const CustomerCard = (prop) => {
  const customer = prop.customer;
  console.log(customer);
  return (
    <Container className="bg-white">
      <Row>
        <Col>
          <p className="px-4 py-3 text-center">Jens</p>
        </Col>
        <Col>
          <p className="px-4 py-3 text-center">{customer.id}</p>
        </Col>
        <Col>
          <p className="px-4 py-3 text-center">{customer.address}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerCard;
