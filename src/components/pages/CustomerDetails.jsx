import { useParams } from "react-router-dom";

import { Col, Row } from "react-bootstrap";

import { Chart } from "primereact/chart";

import * as Icon from 'react-bootstrap-icons';

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
import AnimatedPage from "../AnimatedPage";

import moan from "../../assets/moan.mp3";
import Customers from "./Customers";



const CustomerDetails = () => {
  const { id } = useParams();

  const pink = "#FF4E75";
  const darkBlue = "#FFE8EE";

  const [customerDetails, setCustomerDetails] = useState({});
  const [policies, setPolicies] = useState([]);



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

    //filter out the policies that are not active
    const activePolicies = response.data.policies.filter(
      (policy) => policy.active === true
    );
    setPolicies(activePolicies);
    console.log(response.data)
  };

  //fetch coverage from the database
  

  useEffect(() => {
    getCustomerPolicies();
  }, []);

  function handleClick(e) {
    e.preventDefault();
    window.location.href = "/create/policy/" + customerDetails.id;
  }


  //termin
  const handleTermination = (e) => {
    //e.preventDefault();
    console.log("form submitted");

    //get date of today in format yyyy-mm-dd
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const todayDate = yyyy + "-" + mm + "-" + dd;
  
    const bodyFormData = new FormData();

    console.log("terminating policy with id: " + customerDetails.id + " and date: " + todayDate);
    bodyFormData.append("id", customerDetails.id);
    bodyFormData.append("termination", todayDate);
  
    terminateCustomer(bodyFormData);
  
    e.preventDefault();
    //window.location='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
  
  //create customer in db
  function terminateCustomer(formData) {
    console.log("Terminating Customer")
    console.log(formData)
    const token = Cookies.get("token");
  
    axios({
        method: "post",
        url: globals.ip + "/customer/terminate",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
      }).then((res) => {
        const { status } = res.data;
  
        if (status === true) {
          alert("I will be back");
          return;
        }
        console.log(res.data);
        alert("Customer has been terminated");
      }).catch((err)=>{
        alert("Something when wrong: " + err)
      }).then(()=>{
        window.location = "/customers"
        
      })
  }

 

    return (
    <AnimatedPage>
    {customerDetails.id ? (
    <div className="page">

      <Row className="mx-1 justify-content-between align-items-center">
        <Col className="col-1">
          <img className="border border-3 border-light rounded-circle"
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
                <Link
                className="text-decoration-none" to={"/customer/update/" + id}> 
                <button className="btn-nothing flex-row align-items-center icon-size-small"> {customerDetails.firstName} <Icon.PencilSquare className="fs-6 align-items-center"></Icon.PencilSquare></button> 
                </Link>
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

        <Col className=" justify-content-end text-decoration-none d-flex flex-row gap-2 align-content-end">
              <button className="btn-primary sign-out-button px-3 d-flex flex-row align-items-center gap-2" onClick={handleTermination}><Icon.XLg/>Terminate</button>
              <Link className="text-decoration-none" to={"/customer/update/" + id}>
              <button className="btn-primary sign-out-button px-3 d-flex flex-row align-items-center gap-2"><Icon.CloudArrowUp/>Change details</button>
              </Link>
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
                : customerDetails.CVR}
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

            
              <div className="rounded-2 overflow-hidden py-4">
                
                {policies.length > 0 ? (<PolicyTable policies={policies} id={id} />):(<h1>No policies</h1>)}
                
              </div>
          </div>
        </Row>
    </div>
    ): <LoadingPage/>}
    </AnimatedPage>
  );
  
};

export default CustomerDetails;
