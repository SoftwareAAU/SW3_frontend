import logo from '../../assets/phub.png';
import { Row, Col } from 'react-bootstrap';
import "./loadingpage.css"

import personLogo from "../../assets/person.png";
import firmLogo from "../../assets/firm.png";
import * as Icon from 'react-bootstrap-icons';
import AnimatedPage from '../AnimatedPage';


const LoadingPage = () => {
    return ( 
    <AnimatedPage>
    <div className='page'>

      
<Row className=" mx-1 justify-content-center align-items-center">
        <Col className="col-1">
         <Icon.CircleFill className="loading-page-colors  rounded-circle" size={80} />
        </Col>
        <Col className="d-flex" >
          <div className="px-3">
            
                <h1 className="fw-normal ld-first-name loading-page-colors loading-text"> Firstname </h1>
                <h1 className="fw-normal ld-surname loading-page-colors">
                  Surname
                </h1>
            
          </div>
        </Col>

      </Row>
        


      <Row>
        <Col className="d-flex">
        <div className="customer-details-id px-3 mt-5">
            <p className="customer-details-label-head loading-page-colors">Customer ID</p>
            <hr className=" my-2 loading-page-colors" />
            <p className="fw-light customer-details-label loading-page-colors">Text</p>
          </div>
            
          <div className="customer-details-birthday px-3 mt-5">
            <p className="customer-details-label-head loading-page-colors">Text</p>
            <hr className=" my-2 loading-page-colors" />
            <p className="fw-light customer-details-label loading-page-colors">
                0000000000
            </p>
          </div>

          <div className="customer-details-address px-3 mt-5">
            <p className="customer-details-label-head loading-page-colors">Address</p>
            <hr className=" my-2 loading-page-colors" />
            <p className="fw-light customer-details-label loading-page-colors">text</p>
          </div>

         
        </Col>
      </Row>
      <hr className=" my-5 loading-page-colors" />
      <Row>
        
        <div className="px-3">
            <div className="d-flex flex-col gap-3 justify-content-between align-content-center mb-2 mx-3">
              <p className="customer-details-label-head mt-1 loading-page-colors">Policies</p>
              <button className="btn-primary sign-out-button w-25 mt-0 loading-page-colors " >Add Policy</button>
            </div>
              <div className=" overflow-hidden">
                <p className='loading-page-colors p-2 mb-2'>asdsad</p>
                <p className='loading-page-colors p-2 mb-2'>asdsad</p>
                <p className='loading-page-colors p-2 mb-2'>asdsad</p>
                <p className='loading-page-colors p-2 mb-2'>asdsad</p>
              </div>
          </div>
        </Row>



    </div> 
    </AnimatedPage>
    );
}
 
export default LoadingPage;