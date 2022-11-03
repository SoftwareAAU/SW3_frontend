import {Col, Row, Container} from 'react-bootstrap'
import person from "../../assets/person.png";
import {anal} from './Analytics.css'


const Analytics = () => {
    return ( 

            <div className="page">
                <div className='row'>
                    <div className="col-auto">
                        <img height="50" src={person} />
                    </div>
                    <div className='col'>
                        <span>Carl Ryskov</span><br />
                        <span>Aagesen</span>
                    </div>
                    </div>
                <Row>
                    <Col>
                    <div className='col-2'>
                        <div className='anal'>
                        <p>CustomerID</p>
                        <hr />
                        <p>Address</p>
                        <hr />
                        <p>CPR-number</p>
                        <hr />
                        </div>
                        </div>
                    </Col>
                    <Col>
                        <h2>Pie diagrams</h2>
                    </Col>
                </Row>
            </div>

     );
}
 
export default Analytics;