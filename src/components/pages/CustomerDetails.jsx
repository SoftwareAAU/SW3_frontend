import { useParams } from "react-router-dom";

import { Col, Row } from "react-bootstrap";

import { Chart } from "primereact/chart";

import { useState } from "react";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";

import "./CustomerDetails.css";

import { useEffect } from "react";

import Cookies from "js-cookie";

import axios from "axios";

import globals from "../../globals";

import PolicyTable from "../PolicyTable";

import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";


const CustomerDetails = () => {
  const { id } = useParams();

  const pink = "#FF4E75";
  const darkBlue = "#FFE8EE";

  const [customerDetails, setCustomerDetails] = useState({});



  //fetch customer by id from the database
  const getCustomerPolicies = async () => {
    const headers = {
      token: `${Cookies.get("token")}`,
    };

    const url = globals.ip + "/customer/" + id + "/policies";

    const response = await axios.get(url, {
      headers: headers,
    });

    setCustomerDetails(response.data);
  };

  //fetch coverage from the database
  

  useEffect(() => {
    getCustomerPolicies();
  }, []);

  function handleClick(e) {
    e.preventDefault();
    window.location.href = "/create/policy/" + customerDetails.id;
  }

 

    return (
    <div className="page">
      <Row className=" justify-content-center align-items-center">
        <Col className="col-1">
          <img
            src={customerDetails.type == 0 ? personLogo : firmLogo}
            height={80}
            alt="Logo"
          />
        </Col>
        <Col className="d-flex">
          <div className="px-3">
            {customerDetails.type == 0 ? (
              <>
                <h1 className="fw-normal cd-first-name">
                  {customerDetails.firstName}
                </h1>
                <h1 className="fw-normal cd-surname">
                  {customerDetails.surname}
                </h1>
              </>
            ) : (
              <h1 className="fw-normal cd-first-name">
                {customerDetails.companyName}
              </h1>
            )}
          </div>
        </Col>

      </Row>
        


      <Row>
        <Col className="d-flex">
       

          <div className="customer-details-birthday px-3 mt-5">
            <h4>{customerDetails.type == 0 ? "CPR" : "CVR"}</h4>
            <hr className=" my-2" />
            <h3 className="fw-light">
              {customerDetails.type == 0
                ? customerDetails.cprNumber
                : customerDetails.cvr}
            </h3>
          </div>

          <div className="customer-details-address px-3 mt-5">
            <h4>Address</h4>
            <hr className=" my-2" />
            <h3 className="fw-light">{customerDetails.address}</h3>
          </div>

          <div className="customer-details-id px-3 mt-5">
            <h4>Customer ID</h4>
            <hr className=" my-2" />
            <h3 className="fw-light">{customerDetails.id}</h3>
          </div>
          <br></br>  
        </Col>
      </Row>
      <Row>
        
        <div className="mt-5 px-3 ">
          <Row>

            <h4>Policies</h4>
        
            <button className="btn-primary sign-out-button w-25 mt-0" onClick={(e) => {handleClick(e)}}>Create New Policy</button>

          </Row>
            <hr className=" my-2" />
              <div className="rounded-2 overflow-hidden">
                {customerDetails.policies != null && customerDetails.policies.length > 0 ? (
                <PolicyTable policies={customerDetails.policies} id={id} />
                ):(
                  <p>Loading policies...</p>
                )}
              </div>
          </div>
        </Row>
    </div>
  );
  
};

export default CustomerDetails;
