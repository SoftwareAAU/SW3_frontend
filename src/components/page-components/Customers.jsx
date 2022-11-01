import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import CustomerCard from "./CustomerCard";

import "./Customers.css";
import Axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllCustomers();
    console.log(customers);
  }, []);

  //fetching all customers from the database
  const getAllCustomers = async () => {
    Axios.get("http://130.225.39.66:8080/customers").then((res) => {
      setCustomers(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="customers">
      <div className="customer-cards">
        <CustomerCard
          className=" fw-bold"
          customer={{ id: "Customer ID", name: "Name", address: "Address" }}
        />
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default Customers;
