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
        //Here you can add more customer info if needed
        customer_name: (customer.companyName || customer.firstName + " " + customer.surname),
        customer_type: customer.type
      }
      policiesWithCustomerName.push(policyWithCustomerName);
    });
      //console.log("policiesWithCustomerName:\n");
      //console.log(policiesWithCustomerName);
      setPoliciesWithCustomer(policiesWithCustomerName);
  }


  //Policies array with customer name
  useEffect(() => {
    getAllPoliciesWithToken();
  }, []); //policies, customers

  return (
    <div className="customers">
      <div className="customer-cards">
        <Row className="customer-card-search">
          <h1>Policies</h1>
          <Col>
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Search
              </label>
              <input 
                type="text" 
                placeholder="Search"
                className="form-control customer-card-searchbar"
                onChange={e => console.log(e)}
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Filter by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Filter by</option>
              </select>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Sort by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Sort by</option>
              </select>
            </div>
          </Col>
        <hr/>
        </Row>
        <table className="customer-table table table-bordered">          
          <thead>
            <tr>
              <th className="p-4 customer-table-image" scope="col">

              </th>
              <th className="p-4" scope="col">
                Name
              </th>
              <th className="p-4" scope="col">
                Start Date
              </th>
              <th className="p-4" scope="col">
                Termination Date
              </th>
              <th className="p-4" scope="col">
                Total Premium
              </th>
              <th className="p-4" scope="col">
                Policy Type
              </th>
            </tr>
          </thead>
          <tbody>
            {policiesWithCustomerName && policiesWithCustomerName.length > 0 ? (
              policiesWithCustomerName.map((policy, index) => (
                <tr
                  key={index}
                  onClick={() => console.log(policy)}
                  className="my-4"
                >
                  <td className="p-4">
                    <img
                      height={40}
                      src={policy.customer_type == 0 ? personLogo : firmLogo}
                      alt=""
                    />
                  </td>
                  <td className="p-4">{policy.customer_name}</td>
                  <td className="p-4">{policy.startDate}</td>
                  <td className="p-4">{policy.terminationDate}</td>
                  <td className="p-4">{policy.totalPremium}</td>
                  <td className="p-4">{policy.type}</td>
  
                </tr>
              ))

            ) : (
              <>
                <tr>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                </tr>
                <tr>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                </tr>
                <tr>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                  <td><div className="spinner-grow loading-page-colors"></div></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
export default Policies;