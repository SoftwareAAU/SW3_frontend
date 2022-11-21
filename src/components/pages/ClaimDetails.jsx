import axios from "axios";
import Cookies from "js-cookie";
import {Row, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import LoadingPage from "./LoadingPage";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";


const ClaimDetails = () => {

    const [claim, setClaim] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);


  

    return ( 
        <>
         {claim.id ? (
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
        <Col className="d-flex">
        <div className="customer-details-id px-3 mt-5">
            <p className="customer-details-label-head">Customer ID</p>
            <hr className=" my-2" />
            <p className="fw-light customer-details-label">{customerDetails.id}</p>
          </div>
            
          <div className="customer-details-birthday px-3 mt-5">
            <p className="customer-details-label-head">{customerDetails.type == 0 ? "CPR" : "CVR"}</p>
            <hr className=" my-2" />
            <p className="fw-light customer-details-label">
              {customerDetails.type == 0
                ? customerDetails.cprNumber
                : customerDetails.cvr}
            </p>
          </div>

          <div className="customer-details-address px-3 mt-5">
            <p className="customer-details-label-head">Address</p>
            <hr className=" my-2" />
            <p className="fw-light customer-details-label">{customerDetails.address}</p>
          </div>

         
        </Col>
      </Row>
    </div>
    ): <LoadingPage/>}
    </>

     );
}
 
export default ClaimDetails;