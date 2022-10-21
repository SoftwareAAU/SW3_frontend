import { Container, Row, Col } from 'react-bootstrap';

import './MainSection.css';
import CustomerCard from '../CustomerCard';

const MainSection = () => {
  return (
    <>
      <Row className='mainsection mx-5 my-5'>
        <Col>
          <h1 className='px-3'>Customers</h1>
          <div className='divider'/>
          <div className='blackbar'>
            <input type="text" className="inputField" id="inputCustomer" placeholder="Search in customers"/>
            <select className="inputField" id="inputFilter" placeholder='Filter by'>
              <option>Name</option>
              <option>Age</option>
              <option>Gender</option>
            </select>
          </div>
          <div className="displaycustomers">
            <CustomerCard
              name='Benjamin Franklin'
              type="Person"
              address='Benjavej 24'
              city="Copenhagen"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}
 
export default MainSection;