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
    console.log(customers[0].name)
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
    <div className='mainsection'>
      <h1 className="text-center">Customers</h1>
      <div className="customer-cards">
        {customers.map((customer) => ( 
          <>
          <h1>Address: {customer.address} | id: {customer.id}</h1>
          <br />
          </>
        ))}
      </div>
    </div>
  );
      
}
 
export default MainSection;