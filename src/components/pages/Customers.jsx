import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";

import "./Customers.css";
import Axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [dummyCustomers, setDummyCustomers] = useState([
    {
      name: "John",
      surName: "Doe",
      id: "asd8vjd8",
      address: "1234 Main Street",
      type: "person",
    },
    {
      name: "Karen",
      surName: "Doe",
      id: "add9s0ad9",
      address: "1234 Main Street",
      type: "company",
    },
  ]);

  useEffect(() => {
    getAllCustomers();
    console.log(customers);
  }, []);

  //fetching all customers from the database
  const getAllCustomers = async () => {
    // axios get request with token header
    const response = await Axios.get("http://130.225.39.66:8080/customers", {
      headers: {
        token: "7c038b81-8fb0-4817-80a0-d4821f1e3a6a",
      },
    });
    setCustomers(response.data);
  };

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    console.log(row);
    navigate(`/customers/${row.id}`);
  };

  return (
    <div className="customers">
      <div className="customer-cards">
        <div className="customer-card-search row">
          <div className="col-4">
            <div className="mb-3">
              <label className="form-label">Search</label>
              <input
                type="text"
                placeholder="Search"
                className="form-control customer-card-searchbar"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label className="form-label">Filter by</label>
              <select id="disabledSelect" className="form-select">
                <option>Filter by</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label className="form-label">Sort by</label>
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
            {dummyCustomers.map((customer) => (
              <tr
                key={customer.id}
                className=" my-4"
                onClick={() => handleRowClick(customer)}
              >
                <td className="p-4">
                  <img
                    height={40}
                    src={customer.type === "person" ? personLogo : firmLogo}
                    alt=""
                  />
                </td>
                <td className="p-4">
                  {customer.name} <br /> {customer.surName}
                </td>
                <td className="p-4">{customer.id}</td>
                <td className="p-4">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
