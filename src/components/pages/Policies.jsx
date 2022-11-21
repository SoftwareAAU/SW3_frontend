import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import globals from "../../globals";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";

import "./Customers.css";
import axios from "axios";

import Cookies from "js-cookie";

const Policies = () => {

  //const [policies, setPolicies] = useState([]);
  //const [customers, setCustomers] = useState([]);
  const [policiesWithCustomerName, setPoliciesWithCustomer] = useState([]);

  // const [filteredPolicies, setFilteredPolicies] = useState([]);

  const getAllPoliciesWithToken = async () => {
    const headers = {
      "token": `${Cookies.get("token")}`,
    };
    let url = globals.ip + "/policies";
    let responsePolicies = await axios.get(url, {
      headers: headers,
    });
    let policies = responsePolicies.data.policies;

    url = globals.ip + "/customers";
    const responseCustomers = await axios.get(url, {
      headers: headers,
    });
    let customers = responseCustomers.data.customers;

    //Only active policies
    policies = policies.filter(policy => policy.active === true);


    //Add customer name to policy
    let policiesWithCustomerName = [];
    policies.forEach(policy => {
      let customer = customers.find(customer => customer.id === policy.customer);
      let policyWithCustomerName = {
        ...policy,
        customer_name: (customer.companyName || customer.firstName + " " + customer.surname),
        customer_type: customer.type
      }
      policiesWithCustomerName.push(policyWithCustomerName);
    });
      console.log("policiesWithCustomerName:\n");
      console.log(policiesWithCustomerName);
      setPoliciesWithCustomer(policiesWithCustomerName);
  }


  //Policies array with customer name
  useEffect(() => {
    getAllPoliciesWithToken();
  }, []); //policies, customers

  return (
<></>
  );
}
 
export default Policies;