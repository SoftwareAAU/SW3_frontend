
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
            console.log("fetching fromm:\n"+ url)

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

useEffect(() => {
    
    getCoveragesFromPolicyId();
    getCustomerById();
    

}, []);

const deletePolicy = async (id) => {
    const headers = {
      token: `${Cookies.get("token")}`,
    };

    const bodyFormData = new FormData();
    bodyFormData.append("id", id);

    const url = globals.ip + "/policy/" + id;

    const response = await axios.delete(url, {
      headers: headers,
    });

    console.log(response.data);
  };

const handleDelete = () => {
  //Get id from url
  let urlIDs = window.location.pathname.split("/");
  let customerID = urlIDs[2];
  let policyID = urlIDs[3];
  if (window.confirm('Are you sure you want to delete this policy?')) {
    // Delete
    deletePolicy(policyID);
    alert("Policy deleted.");
  } else {
    // Do nothing!
    alert("Policy not deleted.");
  }
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
          <Col>
              <button className="btn-primary sign-out-button w-25" onClick={handleDelete}>Delete Policy</button>
          </Col>
        </Row>

        <Row className="align-items-center">
        <div className="mt-5 px-3 coverage-table">
            <h4>Coverages</h4>
            <br />
              <div>
                {policyCoverages != null && policyCoverages.length ? (
                    <CoverageTable coverages={policyCoverages} />
                ) : <p>Loading coverages nigger</p>}
              </div>
          </div>
        </Row>
    </div>
    );
};


export default Coverage;