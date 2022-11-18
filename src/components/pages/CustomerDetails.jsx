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

const CustomerDetails = () => {
  const { id } = useParams();

  const pink = "#FF4E75";
  const darkBlue = "#FFE8EE";

  const [customerDetails, setCustomerDetails] = useState({});
  const [coverage, setCoverage] = useState({});


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
  const getCoverage = async () => {
    const headers = {
      token: `${Cookies.get("token")}`,
    };

    const url = globals.ip + "/coverage/" + id;

    const response = await axios.get(url, {
      headers: headers,
    });

    setCoverage(response.data);
  };

  useEffect(() => {
    getCustomerPolicies();
    getCoverage();
  }, []);

  //data for graphs below
  const [chartData] = useState({
    labels: ["Claims used", "Claims Remaining"],
    datasets: [
      {
        data: [8, 2],
        backgroundColor: [pink, darkBlue],
        hoverBackgroundColor: [pink, darkBlue],
      },
    ],
  });

  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

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
        <button className="btn-primary sign-out-button w-25" onClick={(e) => {handleClick(e)}}>Create New Policy</button>


      <Row>
        <Col className="d-flex">
        <div className="mt-5 px-3">
            <h4>Policies</h4>
            <hr className=" my-2" />
            {customerDetails.policies?.map((policy) => (
              <div className="policy" key={policy.id}>
                <h3 className="fw-light">{policy.id}</h3>
              </div>
            ))}
          </div>

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
          <div id="policies">
            <h4>Policies</h4>
            <hr className=" my-2" />
            {customerDetails.policies?.map((policy) => (
              <div className="policy" key={policy.id}>
                <h4 className="fw-light">{policy.id}</h4>
                <button><a href={`${id}/${policy.id}`} style={{textDecoration:"none", color: "black"}}>Browse Coverage</a></button>
              </div>
            ))}
            <button><a href={`/create/policy/${customerDetails.id}`} style={{textDecoration:"none", color: "black"}}>Create New Policy</a></button>
          </div>
        </Col>
{/* 
        <Col className="">
          <Chart
            className="mx-auto"
            type="doughnut"
            data={chartData}
            options={lightOptions}
            style={{ position: "relative", width: "80%" }}
          />
        </Col>
        <Col className="">
          <Chart
            className="mx-auto"
            type="doughnut"
            data={chartData}
            options={lightOptions}
            style={{ position: "relative", width: "80%" }}
          />
        </Col> */}
      </Row>
    </div>
  );
};

export default CustomerDetails;
