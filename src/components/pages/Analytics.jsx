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
        <div className="page">
                <Row className="">
                <Col xs={4} className="d-flex">
                        <img height="50" src={person} />
                        <div className="gg">
                            <div className='d-flex'>
                                <span>Cral Pryskov</span>
                                <br />
                            </div>
                            <span className='d-block analtext'>Mogensen</span> 
                        </div>
                    </Col>
                    <Col xs={{span: "1", offset: "9"}} >
                        <button>Fuck me</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='anal'>
                            <p>CustomerID: 42069666</p>
                            <hr />
                            <p>Adresse: Pikvej 69, 2300 København P (for Pik)</p>
                            <hr />
                            <p>CPR-Number: 030201-6969</p>
                            <hr />
                        </div>
                    </Col>
                    <Col xs={{span: "2", offset:"3"}} className="col-2 piecharts">
                        <Chart className="mx-auto" type="doughnut" data={chartData} options={lightOptions} />
                    </Col>
                    <Col xs={2} className="col-2 piecharts">
                        <Chart className="mx-auto" type="doughnut" data={chartData} options={lightOptions} />
                    </Col>
                </Row>

        </div>
        </>

     );
}
 
export default Analytics;