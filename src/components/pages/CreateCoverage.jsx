import {Col, Row} from "react-bootstrap";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import { redirect } from "react-router-dom";

import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";





const CreateCoverage = () => {



    //coverage info
    // "customer": 1592245,
    // "policy": 406478,
    // "type": 2,
    // "start": "2022-10-10",
    // "termination": "2022-10-10",
    // "premium": 22.2,
    // "deductible": 10.1,
    // "maxCoverage": 10.01
    const [customer, setCustomer] = useState(0);
    const [policy, setPolicy] = useState(0);
    const [type, setType] = useState(0);
    const [start, setStart] = useState("");
    const [termination, setTermination] = useState("");
    const [premium, setPremium] = useState(0.0);
    const [deductible, setDeductible] = useState(0.0);
    const [maxCoverage, setMaxCoverage] = useState(0.0);

    //get id from url
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);


    //policy requiredments

  

    useEffect(() => {
      getPolicyById().then(()=>{
        setDataLoaded(true)
       })
      
    
    }, []);

    //get customer by policy id
    const getPolicyById = async () => {
      const headers = {
        token: `${Cookies.get("token")}`,
      };
  
      const url = globals.ip + "/policy/" + id
  
      const response = await axios.get(url, {
        headers: headers,
      });
      console.log(response.data)
      setPolicy(response.data);

    };
  
    




    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log("form submitted");

        const bodyFormData = new FormData();
        bodyFormData.append("customer", policy.customer);
        bodyFormData.append("policy", policy.id);
        bodyFormData.append("type", type);
        bodyFormData.append("start", start);
        bodyFormData.append("termination", termination);
        bodyFormData.append("premium", premium);
        bodyFormData.append("deductible", deductible);
        bodyFormData.append("maxCoverage", maxCoverage);

     
        createCoverage(bodyFormData);

        e.preventDefault();
        
    }

    //create customer in db
    function createCoverage(formData) {
        console.log("Creating claim")
        console.log(formData)
        const token = Cookies.get("token");

        axios({
            method: "post",
            url: globals.ip + "/coverage/create",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
          }).then((res) => {
            const { status } = res.data;
    
            if (status === true) {
              alert("Claim created");
              return;
            }
            console.log(res.data);
            alert("Coverage Created Bitch");
          }).catch((err)=>{
            alert("Error Bruh: " + err)
          }).then(()=>{
            window.location='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          })
    }

    return ( 
        <>
        {dataLoaded ? (
        <div className="page">
            <h1>Create Coverage</h1>
            <p className="text-muted">{`For coverage: ${id} - customer: `}{policy.customer} </p>
            
        <form onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row className="mx-2 mt-4">
                <Col>
                    <h3>Coverage Creation</h3>
                    

                    {/* //coverage info
    // "customer": 1592245,
    // "policy": 406478,
    // "type": 2,
    // "start": "2022-10-10",
    // "termination": "2022-10-10",
    // "premium": 22.2,
    // "deductible": 10.1,
    // "maxCoverage": 10.01 */}

                    <h3>Type</h3>
                    <input required type="number" className="form-control" placeholder="type" onChange={(e) => setType(e.target.value) }  />
                    <br />
                    <h3>Start Date</h3>
                    <input required type="date" className="form-control" placeholder="start" onChange={(e) => setStart(e.target.value) }  />
                    <br />
                    <h3>Termination Date</h3>
                    <input required type="date" className="form-control" placeholder="termination" onChange={(e) => setTermination(e.target.value) }  />
                    <br />
                    <h3>Premium</h3>
                    <input required type="double" className="form-control" placeholder="premium" onChange={(e) => setPremium(e.target.value) }  />
                    <br />
                    <h3>Deductible</h3>
                    <input required type="double" className="form-control" placeholder="deductible" onChange={(e) => setDeductible(e.target.value) }  />
                    <br />
                    <h3>Max Coverage</h3>
                    <input required type="double" className="form-control" placeholder="maxCoverage" onChange={(e) => setMaxCoverage(e.target.value) }  />
                    <br />

                </Col>
            </Row>
            <Row className="flex flex-column justify-content-center align-items-center">
                <button type="SUBMIT" className="btn-primary sign-out-button mt-5 w-50"> Create Coverage</button>
            </Row>
        </Col>
        </form>


        </div>) : (<div><LoadingPage></LoadingPage></div>)}
        </>
     );
}
 
export default CreateCoverage;