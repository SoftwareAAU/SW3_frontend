import axios from "axios";
import Cookies from "js-cookie";
import {Row, Col} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import LoadingPage from "./LoadingPage";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";
import globals from "../../globals";
import "./claimdetails.css"


const ClaimDetails = () => {

    const { id } = useParams();

    const [claim, setClaim] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);



    const getClaims = async () => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };
        const url = globals.ip + "/claims";
        const response = await axios.get(url, {
            headers: headers,
        });
        console.log(response.data.claims);
        return(response.data.claims);
    }

    //get customer from claim id
    const getCustomerByID = async (id) => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };
        const url = globals.ip + "/customer/" + id;
        const response = await axios.get(url, {
            headers: headers,
        });
        console.log(response.data);
        return(response.data);

    }

    const getClaimAndCustomerName = async () => {
       getClaims().then((claims) => {
              claims.forEach((claim) => {
                if(claim.id == id){
                    setClaim(claim);
                    getCustomerByID(claim.customer).then((customer) => {
                        setCustomerDetails(customer);
                        setDataLoaded(true)
                    })
                }
              })
         });
    }

  

    useEffect(() => {
        getClaimAndCustomerName()
    }, [])

    const handleClick = (e) => {
    }


  

    return ( 
        <>
         {dataLoaded ? (
        <div className="page">

      <Row className="mx-1 justify-content-center align-items-center">
        <Col className="col-1">
          <img
            src={customerDetails.type == 0 ? personLogo : firmLogo}
            height={80}
            alt="Logo"
          />
        </Col>
        
        <Col className="d-flex ">
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
      
      <Row className="mt-0">
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
          </Col>
          <Col className="d-flex col-3">
          <div className="customer-details-address px-3 mt-5">
            <p className="customer-details-label-head">Address</p>
            <p className="fw-light customer-details-label">{customerDetails.address}</p>
          </div>
        </Col>
      </Row>
        
        <hr className="my-4" />
      <div className="p-3 rounded-3 claim-details-claim-info">
            <Row className="">
                <div className="d-flex flex-row justify-content-between mb-3 ">
                    <h1 className="fw-normal cd-first-name mb-1">Claim</h1> 

                    {claim.approved == 1 ? (
                        <h1 className="fw-normal claims-details-approved-text p-2 px-3 rounded-5">Approved</h1>
                    ) : (
                        <button className="btn-primary sign-out-button w-25 mt-0" onClick={(e) => {handleClick(e)}}>Approve</button>
                    )}
                </div>
            </Row>
            <Row className="d-flex">
                <Col>
                    <Row className="d-flex">
                        <p className="customer-details-label-head">Claim ID</p>
                        <p className="fw-light customer-details-label ">{claim.id}</p>
                    </Row>
                    <br />
                    <Row className="d-flex">
                        <p className="customer-details-label-head">Coverage ID</p>
                        <p className="fw-light customer-details-label">{claim.coverage}</p>
                    </Row>
                </Col>

                <Col>
                    <Row className="d-flex">
                        <p className="customer-details-label-head">Creation Date</p>
                        <p className="fw-light customer-details-label">{claim.dateOfClaim}</p>
                    </Row>
                    <br />
                    <Row className="d-flex">
                        <p className="customer-details-label-head">Occurrence Date</p>
                        <p className="fw-light customer-details-label">{claim.dateOfOccurrence}</p>
                    </Row>
                </Col>

                <Col>
                    <Row className="d-flex">
                        <p className="customer-details-label-head">After Deductible</p>
                        <p className="fw-light customer-details-label">{claim.claimAmountAfterDeductible}</p>
                    </Row>
                    <br />
                    <Row className="d-flex">
                        <p className="customer-details-label-head">Before Deductible</p>
                        <p className="fw-light customer-details-label">{claim.claimAmountBeforeDeductible}</p>
                    </Row>
                    <br />
                    <Row className="d-flex">
                        <p className="customer-details-label-head">Amount Paid</p>
                        <p className="fw-light customer-details-label">{claim.claimAmountPaid}</p>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex">
                <p className="customer-details-label-head">Cause</p>
                <p className="fw-light customer-details-label">{claim.cause}</p>
            </Row>
        </div>
        </div>
        ): <LoadingPage/>}
        </>

     );
}

// customer

// coverage
// id

// dateOfClaim
// dateOfOccurrence


// claimAmountAfterDeductible
// claimAmountBeforeDeductible
// claimAmountPaid


// cause






 
export default ClaimDetails;