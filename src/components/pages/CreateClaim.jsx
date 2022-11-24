import {Col, Row} from "react-bootstrap";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import { redirect } from "react-router-dom";

import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import AnimatedPage from "../AnimatedPage";





const CreateClaim = () => {

    //claim info
    const [amount, setAmount] = useState(0);
    const [deductive, setDeductive] = useState(0);
    const [paid, setPaid] = useState(0);
    const [occurrence, setOccurrence] = useState("");
    const [cause, setCause] = useState("");
    const [claimed, setClaimed] = useState("2000-01-01");

    //get id from url
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [coverage, setCoverage] = useState([]);


    //policy requiredments

  

    useEffect(() => {
        console.log(claimed)
        getCustomerFromCoverageID()

        


    
    }, []);

    const getCustomerFromCoverageID = () => {
        console.log("Getting all coverages")
        getAllCoverages().then((data) => {
            for (var cov of data) {
                if (cov.id == id) {
                    console.log("Found coverage")
                    console.log(cov)
                    setCoverage(cov)
                    
                    getCustomerByID(cov.customer).then((customer) => {
                        console.log("Found customer")
                        console.log(customer)
                        setCustomer(customer)
                    })
            }}}).then(() => {
                setDataLoaded(true);
            })
                  
        
       

    }

    const getCustomerByID = async (customerID) => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };
        const url = globals.ip + "/customer/" + customerID;
        const response = await axios.get(url, {
            headers: headers,
        });
        console.log(response.data);
        return(response.data);

    }

    //get all goverages 
    const getAllCoverages = async () => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };
        const url = globals.ip + "/coverages"
        const response = await axios.get(url, {
            headers: headers,
        });
        return response.data.coverages;
    }



   




    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log("form submitted");

            // "customer": Int - CustomerID
            // 	"coverage": Int - CoverageID
            // 	"amount": double - coverageAmount,
            // 	"deductive": double - deductibleAmount,
            // 	"paid": Double - paidForClaim
            // 	"occurrence": Date/String - DateOfOccurence,
            // 	"claimed": Date/String - DateOfClaiming,
            // 	"cause": String - TextExplainingClaim,

        const bodyFormData = new FormData();
        bodyFormData.append("customer", coverage.customer);
        bodyFormData.append("coverage", coverage.id);
        bodyFormData.append("amount", amount);
        bodyFormData.append("deductible", deductive);
        bodyFormData.append("paid", paid);
        bodyFormData.append("occurrence", occurrence);
        bodyFormData.append("claimed", claimed);
        bodyFormData.append("cause", cause);
   
        
        createClaim(bodyFormData);

        e.preventDefault();
        //window.location='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }

    //create customer in db
    function createClaim(formData) {
        console.log("Creating claim")
        console.log(formData)
        const token = Cookies.get("token");

        axios({
            method: "post",
            url: globals.ip + "/claim/create",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
          }).then((res) => {
            const { status } = res.data;
    
            if (status === true) {
              alert("Claim created");
              return;
            }
            console.log(res.data);
            alert("Claim Created Bitch");
          }).catch((err)=>{
            alert("Error Bruh: " + err)
          })
    }

    return ( 
        <AnimatedPage>
        {dataLoaded ? (
        <div className="page">
            <h1>Create Claim</h1>
            <p className="text-muted">{`For coverage: ${id} - customer: `}{customer.type == 0? ` ${customer.firstName} ${customer.surname}`:`${customer.name}`} </p>
            
        <form onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row className="mx-2 mt-4">
                <Col>
                    <h3>Claim Creation</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e) => setClaimed(e.target.value) }  />
                    <br />
                    <h3>Claim Occurrence</h3>
                    <input required type="date" className="form-control" placeholder="Startdate" onChange={(e) => setOccurrence(e.target.value) }  />
                    <br />
                    <h3>Amount</h3>
                    <input required type="double" className="form-control" placeholder="amount" onChange={(e) => setAmount(e.target.value) }   />
                    <br />
                    <h3>Deductive</h3>
                    <input required type="double" className="form-control" placeholder="deductible" onChange={(e) => setDeductive(e.target.value) }   />
                    <br />
                    <h3>Paid</h3>
                    <input required type="double" className="form-control" placeholder="paid" onChange={(e) => setPaid(e.target.value) }   />
                    <br />
                    <h3>Cause</h3>
                    <textarea required type="double" className="form-control" placeholder="cause" onChange={(e) => setCause(e.target.value) }  />
                    <br />
                    <br />
                </Col>
            </Row>
            <Row className="flex flex-column justify-content-center align-items-center">
                <button type="SUBMIT" className="btn-primary sign-out-button mt-5 w-50"> Create Claim</button>
            </Row>
        </Col>
        </form>
{/* 
        // "customer": Int - CustomerID
            // 	"coverage": Int - CoverageID
            // 	"amount": double - coverageAmount,
            // 	"deductive": double - deductibleAmount,
            // 	"paid": Double - paidForClaim
            // 	"occurrence": Date/String - DateOfOccurence,
            // 	"claimed": Date/String - DateOfClaiming,
            // 	"cause": String - TextExplainingClaim, */}

        </div>) : (<div><LoadingPage></LoadingPage></div>)}
        </AnimatedPage>
     );
}
 
export default CreateClaim;