
import { useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {Chart} from "primereact/chart";
import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import { useParams } from "react-router-dom";
import firmLogo from "../../assets/firm.png";
import personLogo from "../../assets/person.png";
import CoverageTable from "../CoverageTable";
import "../CoverageTable.css";
import { faPlaneCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "./LoadingPage";

const Coverage = () => {

    //get url ids from the url
    const urlIDs = window.location.pathname.split("/");
    const customerID = urlIDs[2];
    const policyID = urlIDs[3];

    const [policyCoverages, setPolicyCoverages] = useState({});
         //fetch customer by id from the database
        const getCoveragesFromPolicyId = async () => {
            const headers = {
            token: `${Cookies.get("token")}`,
            };
            
            const url = globals.ip + "/coverages/" + policyID;
            console.log("fetching from:\n"+ url)

            const response = await axios.get(url, {
            headers: headers,
            });

            console.log(response.data);
            setPolicyCoverages(response.data.coverage);
            console.log(response.data.coverage)
        };

    const [customerDetails, setCustomerDetails] = useState({});

    //fetch customer by id from the database
  const getCustomerById = async () => {
    const headers = {
      token: `${Cookies.get("token")}`,
    };

    const url = globals.ip + "/customer/" + customerID;

    const response = await axios.get(url, {
      headers: headers,
    });

    setCustomerDetails(response.data);
  };


  const [policyDetails, setPolicyDetails] = useState({});

  //fetch policy id from the database
  const getPolicyById = async () => {
    const headers = {
      token: `${Cookies.get("token")}`,
    };

    const url = globals.ip + "/policy/" + policyID;

    const response = await axios.get(url, {
      headers: headers,
    });
    console.log("policy stuff")
    console.log(response.data);
    setPolicyDetails(response.data);
  };


useEffect(() => {
    
    getCoveragesFromPolicyId();
    getCustomerById();
    getPolicyById();

}, []);

function handleClick(e) {
  e.preventDefault();
  window.location.href = "/coverage/create/" + policyDetails.id;
}
 
return (
    <>
    {(customerDetails.id && policyDetails.id ) ? (
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
        <div className="policy-id px-3 mt-5">
            <p className="customer-details-label-head">Policy ID</p>
            <hr className=" my-2" />
            <p className="fw-light customer-details-label">{policyDetails.id}</p>
          </div>
          <div className="total-premium px-3 mt-5">
            <p className="customer-details-label-head">Total Premium</p>
            <hr className=" my-2" />
            <p className="fw-light customer-details-label">
              {policyDetails.totalPremium}
            </p>
          </div>
          <div className="policy-start px-3 mt-5">
            <p className="customer-details-label-head">Policy Start</p>
            <hr className=" my-2" />
            <p className="fw-light customer-details-label">
              {policyDetails.startDate}
            </p>
          </div>
        </Col>
          <Col>
              <button>ssss</button>
          </Col>
        </Row>
        <hr className=" my-5" />

        <Row>
          <div className="px-3">
            <div className="d-flex flex-col gap-3 justify-content-between align-content-center mb-2 mx-3">
            <p className="customer-details-label-head mt-1">Coverages</p>
              <button className="btn-primary sign-out-button w-25 mt-0" onClick={(e) => {handleClick(e)}}>Add Coverage</button>
            </div>

            
            <div className="rounded-2 overflow-hidden">

                {policyCoverages && <CoverageTable coverages={policyCoverages} />}


              </div>
          </div>
        </Row>
        
    </div>
    ) : (
      <LoadingPage/>
    )}
    </>
    );
};


export default Coverage;