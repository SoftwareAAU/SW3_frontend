import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import globals from "../../globals";
import Cookies from "js-cookie";

import {Row, Col} from "react-bootstrap";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";


const CustomerPolicies = () => {
   
    const {id} = useParams();

    const [policies, setPolicies] = useState([]);
    const [customer, setCustomer] = useState({});

    const getAllPoliciesWithToken = async () => {

        const headers = {
          "token": `${Cookies.get("token")}`,
        };

        const url = globals.ip + "/customer/" + id + "/policies";
        const response = await axios.get(url, {
          headers: headers,
        });
        setPolicies(response.data.policies);
        setCustomer(response.data);
        console.log("policies test:\n")
        console.log(response.data.policies);
    
      }

    useEffect(() => {
        getAllPoliciesWithToken();
    }, []);


    return ( <div className="page">
         <Row className=" justify-content-center align-items-center">
                <Col className="col-1">
                    <img src={customer.type == 0? personLogo: firmLogo} height={80} alt="Logo" />
                </Col>
                <Col>
                    { customer.type == 0? 
                    <>
                    <h1 className="fw-normal cd-first-name" >{customer.firstName}</h1>
                    <h1 className="fw-normal cd-surname" >{customer.surname}</h1>
                    </>
                    :
                    <h1 className="fw-normal cd-first-name">{customer.companyName}</h1>}
                </Col>
            </Row>
            <Col className=" mt-5">
                <table className="customer-table table table-bordered">
                    <thead>
                        <tr className="table">
                            <th>ID</th>
                            <th>Total Premium</th>
                            <th>Start Date</th>
                            <th>Termination Date</th>
                        </tr>
                    </thead>
                        <tbody>
                    {policies.map((policy) => (
                        <tr>
                            <td>{policy.id}</td>
                            <td>{policy.totalPremium}</td>
                            <td>{policy.startDate}</td>
                            <td>{policy.terminationDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Col>
    </div>  );
}
 
export default CustomerPolicies;