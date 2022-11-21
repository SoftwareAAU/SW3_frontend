
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
import LoadingPage from "./LoadingPage";

const Coverage = () => {
  const { id } = useParams();

    //get url ids from the url
    const urlIDs = window.location.pathname.split("/");
    const customerID = urlIDs[2];
    const policyID = urlIDs[3];
    

    const [policyCoverages, setPolicyCoverages] = useState({});
    const [customerDetails, setCustomerDetails] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);


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

    //fetch customer by id from the database
  const getCustomerById = async (customerID) => {
    const headers = {
      token: `${Cookies.get("token")}`,
    };
    const url = globals.ip + "/customer/" + customerID;
    const response = await axios.get(url, {
      headers: headers,
    });
    setCustomerDetails(response.data);
  };


  const getCoverageAndPolicyDetails = async () => {
    getCustomerById().then((coverages) => {
      coverages.forEach((coverage) => {
        if (coverage.id == id) {
          setPolicyCoverages(coverage);
          getCustomerById(coverage.customer).then((customer) => {
            setCustomerDetails(customer);
            setDataLoaded(true)
          })
        }
      })
 });
}
        

  
useEffect(() => {
    
    getCoveragesFromPolicyId();
    getCustomerById();
    getCoverageAndPolicyDetails();
    

}, []);
 

return (
  <>
  {dataLoaded ? (
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

        <Row className="align-items-center">
        <div className="mt-5 px-3 coverage-table">

              <div>

                {policyCoverages && <CoverageTable coverages={policyCoverages.coverages} id={id} />}

              </div>
          </div>
          
        </Row>
    </div>
    ): <LoadingPage/>}
    </>
    );
};


export default Coverage;