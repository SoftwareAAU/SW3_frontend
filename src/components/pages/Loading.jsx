import phub from '../../assets/phub.png';
import AnimatedPage from '../AnimatedPage';

import "./loading.css";


const Loading = () => {
    return ( 
    <AnimatedPage>
    <div className='loading-page-container d-flex flex-column justify-content-center align-items-center'>
            
        <div className=' d-flex loading-page-image-container'>
            <img src={phub} width={400} alt="loading" className="loading-image" />
        </div>


    </div> 
    </AnimatedPage>
    );
}
 
export default Loading;