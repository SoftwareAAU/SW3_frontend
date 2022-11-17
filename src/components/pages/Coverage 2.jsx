
import { useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {Chart} from "primereact/chart";
import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import { useParams } from "react-router-dom";
import firmLogo from "../../assets/firm.png";
import personLogo from "../../assets/person.png";

const Coverage = () => {

    const  {id}  = useParams();
    const [coverage, setCoverage] = useState({
        id: 12312312,
        maxClaim: 100000,
        claimsUsed: 50000,
        claimsRemaining: 50000,
        claims: [
            {
                id: 12312312,
                amount: 10000,
                date: "2021-01-01",
            },
        ],

    });

         //fetch customer by id from the database
        const getCustomerPolicies = async () => {
            const headers = {
            token: `${Cookies.get("token")}`,
            };

            const url = globals.ip + "/customers/" + id + "/policies";

            const response = await axios.get(url, {
            headers: headers,
            });

            setCustomerDetails(response.data);
        };

        const [customerDetails, setCustomerDetails] = useState({});

       


//fetch coverage from the database
const getCoverage = async () => {
        const headers = {
                token: `${Cookies.get("token")}`,
        };

    const url = globals.ip + "/coverage/" + id;

    const response = await axios.get(url, {
      headers: headers,
    });

    setCoverage(response.data);
}

useEffect(() => {
    getCustomerPolicies();
    getCoverage();


}, []);
 



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
        <Col>
            {customerDetails.type == 0 ? (
            <h1 className="fw-normal cd-first-name">
                {customerDetails.firstName}
            </h1>
            ) : (
            <h1 className="fw-normal cd-first-name">
                {customerDetails.companyName}
            </h1>
            )}
            <h1 className="fw-normal cd-surname">
            {customerDetails.lastName}
            </h1>
        </Col>
        </Row>
        <Row className="align-items-center">
        <Col className="col-4">
            <div>
                <h4>{coverage.id}</h4>
            </div>
            <div>
                <h4>Termination date</h4>
            </div>
            <div>
                <h4>Premium</h4>
            </div>
            <div>
                <h4>Deductible</h4>
            </div>
            <div>
                <h4>Maximum coverage</h4>
            </div>
            <div>
                <h4>Claimed amount</h4>
            </div>
            <div>
                <h4>Insurance type</h4>
            </div> 
        </Col>
        </Row>
    </div>
    );
}


export default Coverage;