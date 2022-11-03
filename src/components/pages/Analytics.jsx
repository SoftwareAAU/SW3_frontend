import {Col, Row, Container} from 'react-bootstrap'
import person from "../../assets/person.png";
import './Analytics.css';
import { Chart } from 'primereact/chart';
import { useState } from "react";
import { useParams } from "react-router-dom";



const Analytics = () => {
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
        <>
                <Row className="page">
                <Col xs={{span: "2"}}>
                        <img height="50" src={person} />
                    <div className='col'>
                        <span>Carl Ryskov</span><br />
                        <span>Aagesen</span>
                    </div>
                        <div className='anal'>
                            <p>CustomerID</p>
                            <hr />
                            <p>Address</p>
                            <hr />
                            <p>CPR-number</p>
                            <hr />
                        </div>
                    </Col>
                    <Col xs={{span: "2", offset:"4"}} className="col-2 piecharts">
                        <Chart className="mx-auto" type="doughnut" data={chartData} options={lightOptions} />
                    </Col>
                    <Col xs={2} className="col-2 piecharts">
                        <Chart className="mx-auto" type="doughnut" data={chartData} options={lightOptions} />
                    </Col>
                </Row>
        </>

     );
}
 
export default Analytics;