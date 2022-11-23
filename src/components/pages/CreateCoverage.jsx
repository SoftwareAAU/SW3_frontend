import {Col, Row} from "react-bootstrap";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import { redirect } from "react-router-dom";


const CreateCoverage = () => {

    //policy requiredments
    const [customer, setCustomer] = useState(0);
    const [type, setType] = useState(0);
    const [start, setStart] = useState("");
    const [termination, setTermination] = useState("");
    const [premium, setpremium] = useState(0.0);
    const [maxCoverage, setMaxCoverage] = useState(0.0);
    const [deductible, setDeductible] = useState(0.0);
    const id = window.location.pathname.split("/")[3];

    const [customerDetails, setCustomerDetails] = useState({type: 0, firstName:"Loading customer...", surname: " "});
    const [policyDetails, setPolicyDetails] = useState({type: 0, id: 0, startDate: "Loading policy...", terminationDate: " "});

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


  //fetch policy by id from the database
    const getPolicy = async () => {
    const headers = {
        token: `${Cookies.get("token")}`,
    };

    const url = globals.ip + "/policy/" + id;

    const response = await axios.get(url, {
        headers: headers,
    });
    console.log(response.data);
    setCustomer(response.data.customer);
    setType(response.data.type);
    setStart(response.data.start);
    setTermination(response.data.termination);
    setpremium(response.data.premium);
    setMaxCoverage(response.data.maxCoverage);
    setDeductible(response.data.deductible);
    setPolicyDetails(response.data);
    };


  //UseEffect to fetch customer details
    useEffect(() => {
        getCustomerPolicies();
        getPolicy();
    }, []);


    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log("form submitted");

        //get id from create/policy/id
        const id = window.location.pathname.split("/")[3];

        const bodyFormData = new FormData();
        bodyFormData.append("type", type);
        bodyFormData.append("start", start);
        bodyFormData.append("termination", termination);
        bodyFormData.append("premium", premium);
        bodyFormData.append("deductible", deductible);
        bodyFormData.append("maxCoverage", maxCoverage);
        
        createCoverage(bodyFormData);

        e.preventDefault();
        window.location='/customers/' + id;
    }

    //create coverage in db
    function createCoverage(formData) {
        const token = Cookies.get("token");

        axios({
            method: "post",
            url: globals.ip + "/coverage/create",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
          }).then((res) => {
            const { status } = res.data;
    
            if (status === true) {
              alert("Coverage created");
              return;
            }
    
            console.log(res.data);
    
            alert("Something went wrong");
          });
    }

    return ( 
        <div className="page">
            <h1>Create Coverage</h1>
            <p className="text-muted">{`For policy: ${policyDetails.id}`}</p>
            
        <form onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row className="mx-2 mt-4">
                <Col>
                    <h3>Start date</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e)=> setStart(e.target.value)} />
                    <br />
                    <h3>Termination date</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e)=> setTermination(e.target.value)} />
                    <br />
                    <h3>Type</h3>
                    <select required className="form-control" onChange={(e)=> setType(e.target.value)}>
                        <option value="0">Car</option>
                        <option value="1">Hus</option>
                        <option value="2">Wife</option>
                        <option value="3">Your retarded brother Billo</option>
                    </select>
                    <br />
                    <h3>Premium</h3>
                    <input required type="number" className="form-control" placeholder="Premium" onChange={(e)=> setpremium(e.target.value)} />
                    <br />
                    <h3>Deductible</h3>
                    <input required type="number" className="form-control" placeholder="Deductible" onChange={(e)=> setDeductible(e.target.value)} />
                    <br />
                    <h3>Max Coverage</h3>
                    <input required type="number" className="form-control" placeholder="Max Coverage" onChange={(e)=> setMaxCoverage(e.target.value)} />
                    <br />
                </Col>
            </Row>
            <Row className="flex flex-column justify-content-center align-items-center">
                <button type="SUBMIT" className="btn-primary sign-out-button mt-5 w-50"> Create coverage</button>
            </Row>
        </Col>
        </form>

        </div>
     );
}
 
export default CreateCoverage;