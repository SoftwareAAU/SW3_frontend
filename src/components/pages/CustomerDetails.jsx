import { useParams } from "react-router-dom";

import { Col, Row } from "react-bootstrap";

import { Chart } from 'primereact/chart';

import { useState } from "react";

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";

import "./CustomerDetails.css";

const CustomerDetails = () => {
  const { id } = useParams();

  const pink = "#FF4E75";
  const darkBlue = "#FFE8EE";

  const [chartData] = useState({
    labels: ['Claims used', 'Claims Remaining'],
    datasets: [
        {
            data: [8, 2],
            backgroundColor: [
                pink,
                darkBlue,
            ],
            hoverBackgroundColor: [
                pink,
                darkBlue,
            ]
        }]
});

const [lightOptions] = useState({
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
});

  return (
    <div className="page">
        <Row className=" justify-content-center align-items-center">
            <Col className="col-1">
                <img src={personLogo} height={80} alt="" />
            </Col>
            <Col>
                <h1 className="fw-normal">Dummy Name</h1>
                <h3 className="customer-details-surname  fw-normal">Dummy Surname</h3>
            </Col>
            
        
        </Row>
        <Row className="align-items-center">
            <Col className="4">

            <div className="customer-details-birthday mt-5">
                    <h4>Birthday</h4>
                    <hr className=" my-2" />
                    <h3 className="fw-light">12-34-5678</h3>
                </div>
              
                
                <div className="customer-details-address mt-5">
                    <h4>Address</h4>
                    <hr className=" my-2" />
                    <h3 className="fw-light">Dummyroad 12 - 1 tv,</h3>
                    <h3 className="fw-light">2120 DummyTown</h3>
                 </div>

                 <div className="customer-details-id mt-5">
                    <h4>Customer ID</h4>
                    <hr className=" my-2" />
                    <h3 className="fw-light">ask12j3jk2lasdk</h3>
                </div>

            </Col>

            <Col className="4">
                <Chart className="mx-auto" type="doughnut" data={chartData} options={lightOptions} style={{ position: 'relative', width: '80%' }} />
            </Col>
            <Col className="4">
                <Chart className="mx-auto" type="doughnut" data={chartData} options={lightOptions} style={{ position: 'relative', width: '80%' }} />
            </Col>
        </Row>
    </div>
  );
};

export default CustomerDetails;
