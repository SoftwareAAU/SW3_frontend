import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import globals from "../../globals";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";

import "./Customers.css";
import axios from "axios";

import Cookies from "js-cookie";

const Customers = () => {
  
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllCustomersWithToken();
    
  }, []);


  //fetching all customers from the database with token in the body
  const getAllCustomersWithToken = async () => {
 
      const headers = {
        "token": `${Cookies.get("token")}`,
      };

      //correct link
      //130.225.39.66:8080/customers";

      //dev link
      const url = globals.ip + "/customers";

      const response = await axios.get(url, {
        headers: headers,
      });

      setCustomers(response.data.customers);
      console.log(response.data.customers);
    };

  const navigate = useNavigate();
  
  const handleRowClick = (row) => {
    navigate(`/customers/${row.id}`);
  };

  return (
    <div className="customers">
      <div className="customer-cards">
        <div className="customer-card-search row">
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Search
              </label>
              <input
                type="text"
                placeholder="Search"
                className="form-control customer-card-searchbar"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Filter by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Filter by</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
                Sort by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Sort by</option>
              </select>
            </div>
          </div>
          <hr />
        </div>
        <table className="customer-table table table-bordered">
          <thead>
            <tr>
              <th className="p-4 customer-table-image" scope="col">
                Type
              </th>
              <th className="p-4" scope="col">
                Name
              </th>
              <th className="p-4" scope="col">
                Customer ID
              </th>
              <th className="p-4" scope="col">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (

              
              <tr
                key={customer.id}
                className=" my-4"
                onClick={() => handleRowClick(customer)}>
                <td className="p-4">
                  <img
                    height={40}
                    src={customer.type == 0 ? personLogo : firmLogo}
                    alt=""
                  />
                </td>
                <td className="p-4">
                  {customer.type == 0? 
                    (
                      customer.firstName +"\n"+ customer.surname)
                    : customer.companyName}
                  
                </td>
                <td className="p-4">{customer.id}</td>
                <td className="p-4">{customer.address}</td>
              </tr>
            ))
          ) : (
            <>
            <tr >
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
            </tr>
            <tr >
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
            </tr>
            <tr >
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
              <td><div className="spinner-grow"></div></td>
            </tr>
            </>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
