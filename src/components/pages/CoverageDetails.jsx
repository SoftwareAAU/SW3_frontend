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
import ClaimsTable from "../ClaimsTable";
import AnimatedPage from "../AnimatedPage";
import ClaimDetailsTable from "../ClaimDetailsTable";


const CoverageDetails = () => {

    const { id } = useParams();
    const idArray = window.location.href.split("/");

    const urlIDs = window.location.pathname.split("/");
    const [claims, setClaims] = useState([]);
    const [coverage, setCoverage] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [coverages, setCoverages] = useState([]);



    const getCoverages = async () => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };
        const url = globals.ip + "/coverages";
        const response = await axios.get(url, {
            headers: headers,
        });
        console.log(response.data.coverages);
        //return(response.data.coverages);

        //filter out the coverages that are not active
        return coverages.filter((coverage) => coverage.active == "active");
        // setCoverages(activeCoverages);
    

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

    const getCoverageCustomerAndClaims = async () => {
       getCoverages().then((coverages) => {
              coverages.forEach((coverage) => {
                if(coverage.id == id){
                    setCoverage(coverage);

                    getCustomerByID(coverage.customer).then((customer) => {
                        setCustomerDetails(customer);

                    getClaimsByCoverageID(coverage.id).then((claims) => {
                        setClaims(claims);  
                    })}).then(()=>{
                        setDataLoaded(true);
                        })
                }
              })
         });
    }

    const getClaimsByCoverageID = async (id) => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };
        const url = globals.ip + "/claims/" + id;
        const response = await axios.get(url, {
            headers: headers,
        });
        console.log("claims by coverageID: " +id);
        console.log(response.data.claims);
        return(response.data.claims);
    }
  
    const navigate = useNavigate()
    const navToCreateClaim = () => {
        navigate("/create/claim/" + idArray[6]);
    }


    const handleTermination = (e) => {
      //e.preventDefault();
      console.log("form submitted");
    
      const bodyFormData = new FormData();
      bodyFormData.append("id", coverage.id);
    
      terminateCoverage(bodyFormData);
    
      e.preventDefault();
      //window.location='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
    
    //create customer in db
    function terminateCoverage(formData) {
      console.log("Terminating coverage")
      console.log(formData)
      const token = Cookies.get("token");
    
      axios({
          method: "post",
          url: globals.ip + "/coverage/terminate",
          data: formData,
          headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
        }).then((res) => {
          const { status } = res.data;
    
          if (status === true) {
            alert("I will be back");
            return;
          }
          console.log(res.data);
          alert("Hasta la vista. Baby");
        }).catch((err)=>{
          alert("Error Bruh: " + err)
        }).then(()=>{
          window.location = urlIDs[0] + "/" + urlIDs[1] + "/" + urlIDs[2];
        })
    }
  

    useEffect(() => {

        getCoverageCustomerAndClaims()

        
        
    }, [])

    const handleClick = (e) => {
    }

    return ( 
        <AnimatedPage>
         {dataLoaded ? (
        <div className="page customers">

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
      <Row>
          <Col>
              <button className="btn-primary sign-out-button w-25" onClick={handleTermination}>Delete Coverage</button>
          </Col>
        </Row>
      
      {/* <Row className="mt-0">
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
      </Row> */}
        
        <hr className="my-4" />
      <div className="p-3 rounded-3">
            <Row className="">
                <div className="d-flex flex-row justify-content-between">
                    <h1 className="fw-normal cd-first-name mb-1">Coverage</h1> 
                    
                </div>
            </Row>
            <br />
            <Row className="d-flex">
                   <table className="customer-table table table-bordered py-4">
                        <thead className="">
                            <tr>
                                <th className="p-2  py-3" scope="col">
                                Coverage ID
                                </th>
                                <th className="p-2  py-3" scope="col">
                                Customer ID
                                </th>
                                <th className="p-2  py-3" scope="col">
                                Policy ID
                                </th>
                                <th className="p-2 py-3" scope="col">
                                Start
                                </th>
                                <th className="p-2 py-3" scope="col">
                                Termination
                                </th>
                                <th className="p-2 py-3" scope="col">
                                Type
                                </th>
                                <th className="p-2 py-3" scope="col">
                                Premium
                                </th>
                                <th className="p-2 py-3" scope="col">
                                Currently Claimed
                                </th>
                                <th className="p-2 py-3" scope="col">
                                Deductible
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr className=" my-4">
                                <td className="p-2 py-3">{coverage.id}</td>
                                <td className="p-2 py-3">{coverage.customer}</td>
                                <td className="p-2 py-3">{coverage.policy}</td>
                                <td className="p-2 py-3">{coverage.startDate}</td>
                                <td className="p-2 py-3">{coverage.terminationDate}</td>
                                <td className="p-2 py-3">{coverage.type}</td>
                                <td className="p-2 py-3">{coverage.premium}</td>
                                <td className="p-2 py-3">{coverage.currentClaimAmount}/{coverage.maxCoverage}</td>
                                <td className="p-2 py-3">{coverage.deductible}</td>
                            </tr>
                        </tbody>
                   </table>
            </Row>
            <hr />
            <Row className="">
                <div className="d-flex flex-row justify-content-between">
                    <h1 className="fw-normal cd-first-name mb-1">Claims</h1> 
                    <button className="btn-primary sign-out-button px-3 mt-0 w-25" onClick={navToCreateClaim}>Create Claim</button>
                </div>
                
            </Row>
            <br />
            <ClaimDetailsTable claims={claims}></ClaimDetailsTable>
        </div>
        </div>
        ): <LoadingPage/>}
        </AnimatedPage>

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






 
export default CoverageDetails;