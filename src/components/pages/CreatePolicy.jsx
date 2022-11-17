import {Col, Row} from "react-bootstrap";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";


const CreatePolicy = () => {

    //policy requiredments
    const [customer, setCustomer] = useState(0);
    const [start, setStart] = useState("");
    const [termination, setTermination] = useState("");
    const [totalPremium, setTotalPremium] = useState(0.0);
    const [policyType, setPolicyType] = useState(0);
    const id = window.location.pathname.split("/")[3];

    const [customerDetails, setCustomerDetails] = useState({type: 0, firstName:"Loading customer...", surname: " "});

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

  //UseEffect to fetch customer details
    useEffect(() => {
        getCustomerPolicies();
    }, []);


    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log("form submitted");

        //get id from create/policy/id
        const id = window.location.pathname.split("/")[3];
        setCustomer(id);

        const bodyFormData = new FormData();
        bodyFormData.append("customer", customer);//
        bodyFormData.append("start", start);//
        bodyFormData.append("termination", termination);//
        bodyFormData.append("totalPremium", 0);//
        bodyFormData.append("type", policyType);//Type
        
        createPolicy(bodyFormData);
    }

    //create customer in db
    function createPolicy(formData) {
        const token = Cookies.get("token");

        axios({
            method: "post",
            url: globals.ip + "/policy/create",
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
            <p className="text-muted">{`For customer: ${customerDetails.type == 0 ? (customerDetails.firstName + " " + customerDetails.surname) : (customerDetails.companyName)}`}</p>
            
        <form onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row className="mx-2 mt-4">
                <Col>
                    <h3>Start dato</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e)=> setStart(e.target.value)} />
                    <br />
                    <h3>Termination date</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e)=> setTermination(e.target.value)} />
                    <br />
                    <h3>Type</h3>
                    <select required className="form-select" onChange={(e)=> setPolicyType(e.target.value)}>
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