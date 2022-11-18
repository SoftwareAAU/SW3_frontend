import logo from '../../assets/phub.png';
import { Row, Col } from 'react-bootstrap';
import "./loadingpage.css"

const LoadingPage = () => {
    return ( <div className='page'>

        <div className=''>


            <div className='loading-img-container mx-auto'>
                <img src={logo} width={300} className=" rounded bottom-50" alt="" />
                </div>
        </div>


    </div> );
}
 
export default LoadingPage;