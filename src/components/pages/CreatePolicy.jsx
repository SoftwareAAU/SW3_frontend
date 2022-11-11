import {Col, Row} from "react-bootstrap";
import { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";


const CreatePolicy = () => {


    //handle select change
    const [customerType, setcustomerType] = useState(0);

    //policy requiredments
    const customer = 828256;
    const [start, setStartDate] = useState("");
    const [termination, setTerminationDate] = useState("");
    const [totalPremium , setTotalPremium] = useState("");
    const [type, setType] = useState("");

    const handleSelectChange = (e) => {
        setcustomerType(e.target.value);
    }

   const handleSubmit = (e) => {

     //create person policy
     const policy = {
        customer: customer,
        start: start,
        termination: termination,
        totalPremium: totalPremium,
        type: type,
    }
    console.log(policy);

    const bodyFormData = new FormData();
    bodyFormData.append("customer", customer);
    bodyFormData.append("start", start);
    bodyFormData.append("termination", termination);
    bodyFormData.append("totalPremium", totalPremium);
    bodyFormData.append("type", type);
    createPolicyInDB(bodyFormData);

   }

   function createPolicyInDB(formData) {
    const token = Cookies.get("token");

    axios({
        method: "post",
        url: globals.ip + "/create/policy",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
      }).then((res) => {
        const { status } = res.data;

        if (status === true) {
          alert("Policy created");
          return;
        }

        console.log(res.data);

        alert("Something went wrong");
      });
  
}

    return ( 
        <div className="page">
            <h1>Create Policy</h1>
        <form onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row className="mx-2 mt-4">
                <Col>
                    <h3>Customer Type</h3>
                    <select required className="form-select" onChange={(e)=> setcustomerType(e.target.value)} >
                        <option defaultValue={0} value="0">Person</option>
                        <option value="1">Company</option>
                    </select>
                    <br />
                    <h3>Start dato</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e)=> setStartDate(e.target.value)} />
                    <br />
                    <h3>Termination date</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e)=> setTerminationDate(e.target.value)} />
                    <br />
                    <h3>Total Premium</h3>
                    <input required type="number" className="form-control" placeholder="Total Premium" onChange={(e)=> setTotalPremium(e.target.value)} />
                    <br />
                    <h3>Type</h3>
                    <select required className="form-select" onChange={(e)=> setType(e.target.value)}>
                        <option value="0">Household Insurance</option>
                        <option value="1">Car Insurance</option>
                        <option value="2">Travel Insurance</option>
                        <option value="3">Life Insurance</option>
                        <option value="4">Health Insurance</option>
                        <option value="5">Accident Insurance</option>
                    </select>
                </Col>
            </Row>
            <Row className="flex flex-column justify-content-center align-items-center">
                <button type="SUBMIT" className="btn-primary sign-out-button mt-5 w-50"> Create customer</button>
            </Row>
        </Col>
        </form>

        </div>
     );
}
 
export default CreatePolicy;