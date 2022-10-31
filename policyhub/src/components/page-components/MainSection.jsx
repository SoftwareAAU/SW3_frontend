import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import './MainSection.css';
import CustomerCard from '../CustomerCard';
import Axios from 'axios';

const MainSection = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllCustomers();
    console.log(customers)
  }, []);
  

  //fetching all customers from the database
  const getAllCustomers = async () =>{
    Axios.get("http://130.225.39.66:8080/customers", )
      .then((res) => {
        setCustomers(res.data);
        console.log(res.data);
      }
    )
  }

  





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
          <div className='test'>
          </div>
        </Col>
      </Row>
    </>
  );
}
 
export default MainSection;