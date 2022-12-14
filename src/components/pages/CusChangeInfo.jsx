import {Col, Row} from "react-bootstrap";
import { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import globals from "../../globals";
import AnimatedPage from "../AnimatedPage";
import * as Icon from 'react-bootstrap-icons';

import { useParams } from "react-router-dom";
import { useEffect } from "react";


const CusChangeInfo = () => {


    useEffect(() => {
        getCustomerByID();
    }, []);

    const [cusDetails, setCusDetails] = useState({});
    const [customerType, setcustomerType] = useState(0);
    const [address, setAddress] = useState("");
    
    //person
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");

    //company
    const [name , setName] = useState("");


    const {id} = useParams();

    //get customer from db by id
    const getCustomerByID = async () => {
        const headers = {
          token: `${Cookies.get("token")}`,
        };
    
        const url = globals.ip + "/customer/" + id;
    
        const response = await axios.get(url, {
          headers: headers,
        });
        setCusDetails(response.data);
        
        setFirstName(response.datafirstName);
        setSurname(response.datasurname);
        setName(response.data.companyName);
        setAddress(response.data.address);

        console.log(response.data);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
        console.log (customerType);

        if (customerType == 0)
        {
            if(firstName || surname || address){
            //create person object
            const person = {
                address: address,
                firstname: firstName,
                lastname: surname,
            }
            console.log(person);

            const bodyFormData = new FormData();
            bodyFormData.append("id", id);
            bodyFormData.append("address", address);
            bodyFormData.append("firstname", firstName);
            bodyFormData.append("lastname", surname);
            updateCustomerInDB(bodyFormData);
            } else{
                alert("Please fill out all fields");
            }

        } else{
            if(name || address){

            //create company object
            const company = {
                address: address,
                name: name,
            }
            console.log(company);
            
            const bodyFormData = new FormData();
            bodyFormData.append("id", id);
            bodyFormData.append("address", address);
            bodyFormData.append("name", name);
            updateCustomerInDB(bodyFormData);
            }
            else{
                alert("Please fill out all fields");
            }

        }

    }


    //create customer in db
    function updateCustomerInDB(formData) {
        const token = Cookies.get("token");

        axios({
            method: "post",
            url: globals.ip + "/customer/update",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", "token": `${token}` },
          }).then((res) => {
            const { status } = res.data;
    
            if (status === true) {
                console.log("customer updated");
              return;
            }
    
            console.log(res.data);
    
            
          }).then(() => {
            window.location.href = "/customers/"+id;
          })
    }

    return ( 
        <AnimatedPage>
        <div className="page">
            <h1 className="link d-flex flex-row align-items-center gap-2"> <Icon.PersonPlusFill /> Change Customer Information</h1>
        <form  onSubmit={(formData) => handleSubmit(formData)}>
        <Col>
            <Row>
        {cusDetails.type == 0 ?
        <>
                <Col className="">

                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active"> <Icon.PersonFill /> First Name</h3>
                    <input required type="text" className="form-control" defaultValue={firstName} onChange={(e)=> setFirstName(e.target.value)} />
                    </Row>
                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active"><Icon.PersonFill /> Sur Name</h3>
                    <input required type="text" className="form-control" defaultValue={surname} onChange={(e)=> setSurname(e.target.value)} />
                    </Row>
                </Col>
                <Col>
                    <Row className="mx-2 mt-4">
                    <h3 className="link d-flex flex-row align-items-center gap-2 active"><Icon.HouseFill />Address</h3>
                    <input required type="text"  className="form-control" defaultValue={address} onChange={(e)=> setAddress(e.target.value)} />
                    </Row>
                </Col>
                
        </>:
        <>
                <Row className="mx-2 mt-4">
                    <h3>Company Name</h3>
                    <input required  type="text" className="form-control" defaultValue={name} onChange={(e)=> setName(e.target.value)} />
                </Row>
                <Row className="mx-2 mt-4">
                    <h3>Address</h3>
                    <input required type="text"  className="form-control" defaultValue={address} onChange={(e)=> setAddress(e.target.value)} />
                    </Row>
                
        </>}
            </Row>
            <Row className="flex flex-column justify-content-center align-items-center">
                <button type="SUBMIT" className="btn-primary sign-out-button mt-5 w-50"> Change Customer Information</button>
            </Row>
        </Col>
        </form>

        </div>
        </AnimatedPage>
     );
}
 
export default CusChangeInfo;