
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
import AllCoveragesTable from "../AllCoveragesTable";
import AnimatedPage from "../AnimatedPage";
import PolicyDetailsTable from "../PolicyDetailsTable";

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
        const cov = response.data.coverage.filter((cov) => cov.active === 1);
        setPolicyCoverages(cov);
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
 
const handleClick = () => {
  //Get id from url
  let urlIDs = window.location.pathname.split("/");
  let customerID = urlIDs[2];
  let policyID = urlIDs[3];
  window.location.href = "/create/coverage/" + policyID;
}

//new stuff


const handleTermination = (e) => {
  //e.preventDefault();
  console.log("form submitted");

  const bodyFormData = new FormData();
  bodyFormData.append("id", policyID);

  terminatePolicy(bodyFormData);

  e.preventDefault();
  //window.location='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}

//create customer in db
function terminatePolicy(formData) {
  console.log("Creating claim")
  console.log(formData)
  const token = Cookies.get("token");

  axios({
      method: "post",
      url: globals.ip + "/policy/terminate",
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


return (
 <AnimatedPage>
 {customerDetails.id ? (
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
              <button className="btn-primary sign-out-button w-25" onClick={handleTermination}>Delete Policy</button>
          </Col>
        </Row>

        <hr className=" my-5" />
        <Row>

        <div className="px-3">
        <div className="d-flex flex-col gap-3 justify-content-between align-content-center mb-2 mx-3">
              <p className="customer-details-label-head mt-1">Coverages</p>
              <button className="btn-primary sign-out-button w-25 mt-0" onClick={(e) => {handleClick(e)}}>Add Coverage</button>
            </div>

              <div className="rounded-2 overflow-hidden py-4">
                {policyCoverages != null && policyCoverages.length ? (
                    <PolicyDetailsTable coverages={policyCoverages} />
                ) : <></>}
                
              </div>
          </div>
        </Row>
    </div>
    ) : <LoadingPage />}
  </AnimatedPage> 
        );
};


export default Coverage;