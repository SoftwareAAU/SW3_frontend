import {Col, Row} from "react-bootstrap";
import { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import AnimatedPage from "../AnimatedPage";

import * as Icon from 'react-bootstrap-icons';

const CreateCustomer = () => {


    //handle select change
    const [customerType, setcustomerType] = useState(0);
    const [address, setAddress] = useState("");
    
    //person

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [birth , setBirth] = useState("");
    const [cpr, setCpr] = useState("");
    const [gender, setGender] = useState(0);

    //company
    const [name , setName] = useState("");
    const [cvr, setCvr] = useState("");
    const [creation, setCreation] = useState("");


    const handleSelectChange = (e) => {
        setcustomerType(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
        console.log (customerType);

        if (e.target.type.value == 0)
        {
            //create person object
            const person = {
                type: e.target.type.value,
                address: address,
                firstname: firstName,
                lastname: surname,
                birth: birth,
                gender: gender,
                cpr: cpr,
            }
            console.log(person);

            const bodyFormData = new FormData();
            bodyFormData.append("type", e.target.type.value);
            bodyFormData.append("address", address);
            bodyFormData.append("firstname", firstName);
            bodyFormData.append("lastname", surname);
            bodyFormData.append("birth", birth);
            bodyFormData.append("gender", gender);
            bodyFormData.append("cpr", cpr);
            createCustomerInDB(bodyFormData);

        } else{

            //create company object
            const company = {
                type: e.target.type.value,
                address: address,
                cvr: cvr,
                name: name,
                creation: creation,
            }
            console.log(company);
            
            const bodyFormData = new FormData();
            bodyFormData.append("type", e.target.type.value);
            bodyFormData.append("address", address);
            bodyFormData.append("cvr", cvr);
            bodyFormData.append("name", name);
            bodyFormData.append("creation", creation);
            createCustomerInDB(bodyFormData);

        }

    }

    //create customer in db
    function createCustomerInDB(formData) {
        const token = Cookies.get("token");
    

        axios({
            method: "post",
            url: globals.ip + "/customer/create",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
          }).then((res) => {
            const { status } = res.data;
    
            if (status === true) {
              alert("Customer created");
              window.location = "/customers";
              return;
            }
    
            console.log(res.data);
    
            alert("An error occurred whilst trying to create customer");
          });
      
       
    }

    return ( 
        <AnimatedPage>
        <div className="page">
            <h1 className="link d-flex flex-row align-items-center gap-2"> <Icon.PersonPlusFill /> Create Customer</h1>
        <form  onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row className="mx-2 mt-4">
                <Col>
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Compass/>Customer Type</h3>
                    <select required name="type" className="form-select" onChange={(e)=> setcustomerType(e.target.value)} >
                        <option defaultValue={0} value="0">Person</option>
                        <option value="1">Company</option>
                    </select>
                </Col>
            </Row>
            <Row>
        {customerType == 0 ?
        <>
                <Col>

                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"> <Icon.Person /> First Name</h3>
                    <input required type="text" className="form-control" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} />
                    </Row>
                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Person /> Sur Name</h3>
                    <input required type="text" className="form-control" placeholder="Surname" onChange={(e)=> setSurname(e.target.value)} />
                    </Row>
                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Calendar />Birthday</h3>
                    <input required type="date" className="form-control" placeholder="Birthday" onChange={(e)=> setBirth(e.target.value)} />
                    </Row>
                </Col>

                <Col>
                <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Gear />Gender</h3>
                    <select required className="form-select" onChange={(e)=> setGender(e.target.value)} >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>
                    
                    </Row>
                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Lock />CPR</h3>
                    <input required type="number"  className="form-control" placeholder="Cpr" onChange={(e)=> setCpr(e.target.value)} />
                    </Row>
                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.House />Address</h3>
                    <input required type="text"  className="form-control" placeholder="Address" onChange={(e)=> setAddress(e.target.value)} />
                    </Row>
                </Col>
                
        </>:
        <>
                <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Building />Company Name</h3>
                    <input required  type="text" className="form-control" placeholder="Company Name" onChange={(e)=> setName(e.target.value)} />
                </Row >
                <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.CardText />CVR</h3>
                    <input required  type="number" className="form-control" placeholder="CVR" onChange={(e)=> setCvr(e.target.value)} />
                </Row>
                <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.Calendar />Creation Date</h3>
                    <input required  type="date" className="form-control" placeholder="Creation date" onChange={(e)=> setCreation(e.target.value)} />
                </Row>
                <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active custom-form-label"><Icon.PinMap />Address</h3>
                    <input required type="text"  className="form-control" placeholder="Address" onChange={(e)=> setAddress(e.target.value)} />
                    </Row>
                
        </>}
            </Row>
            <Row className="flex flex-column justify-content-center align-items-center">
                <button type="SUBMIT" className="btn-primary sign-out-button mt-5 w-50"> Create customer</button>
            </Row>
        </Col>
        </form>
        </div>
        </AnimatedPage>
     );
}
 
export default CreateCustomer;