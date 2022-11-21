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
    <>
    {customerDetails.id ? (
    <div className="page">

      <Row className="mx-1 justify-content-center align-items-center">
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
        <Col className="d-flex col-3">
        <div className="customer-details-id px-3 mt-5">
            <p className="customer-details-label-head">Customer ID</p>
            <p className="fw-light customer-details-label">{customerDetails.id}</p>
          </div>
        </Col>
        <Col className="d-flex col-3">
          <div className="customer-details-birthday px-3 mt-5">
            <p className="customer-details-label-head">{customerDetails.type == 0 ? "CPR" : "CVR"}</p>
            <p className="fw-light customer-details-label">
              {customerDetails.type == 0
                ? customerDetails.cprNumber
                : customerDetails.cvr}
            </p>
          </div>
          </Col >

            <Col className="d-flex col-3">
          <div className="customer-details-address px-3 mt-5">
            <p className="customer-details-label-head">Address</p>
            <p className="fw-light customer-details-label">{customerDetails.address}</p>
          </div>

         
        </Col>
      </Row>
      <hr className=" my-5" />
      <Row>
        
        <div className="px-3">
            <div className="d-flex flex-col gap-3 justify-content-between align-content-center mb-2 mx-3">
              <p className="customer-details-label-head mt-1">Policies</p>
              <button className="btn-primary sign-out-button w-25 mt-0" onClick={(e) => {handleClick(e)}}>Add Policy</button>
            </div>

            
              <div className="rounded-2 overflow-hidden">
                
                {customerDetails && <PolicyTable policies={customerDetails.policies} id={id} />}
                
              </div>
          </div>
        </Row>
    </div>
    ): <LoadingPage/>}
    </>
  );
  
};

export default CustomerDetails;
