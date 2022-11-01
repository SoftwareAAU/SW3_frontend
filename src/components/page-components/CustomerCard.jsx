import "./CustomerCard.css";
import { Container, Row, Col } from "react-bootstrap";

import personLogo from "../../assets/person.png";

const CustomerCard = (prop) => {
  const customer = prop.customer;
  console.log(customer);
  return (
    <Container className="">
      <Row>
        <Col>
        
        <p className="px-4 py-3 text-center">
        <img src={personLogo} height="28px" alt="LOGO"/>
        {customer.name}
        {customer.surName}
        </p>
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
