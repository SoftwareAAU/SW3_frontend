import {Col, Row} from "react-bootstrap";
import { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";


const CreatePolicy = () => {

    //handle select change
    const [customerType, setcustomerType] = useState(0);
    //const [address, setAddress] = useState("");

    <>
        <div className="Page">
            <h1>Create Policy</h1>
        <form>
        <Col>
            <Row>
                <Col>
                    <h3>Customer Type</h3>
                    <select required className="form-select" onChange={(e)=> setcustomerType(e.target.value)} >
                        <option defaultValue={0} value="0">Person</option>
                        <option value="1">Company</option>
                    </select>
                </Col>
            </Row>
        </Col>
        </form>

        </div>
    </>


}

export default CreatePolicy;