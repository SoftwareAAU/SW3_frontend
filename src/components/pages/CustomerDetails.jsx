import { useParams } from "react-router-dom";

const CustomerDetails = () => {

    const { id } = useParams();

    return ( <div>
        <h1>Customer Details</h1>
        <h2>Customer ID: {id}</h2>
        
    </div> );
}
 
export default CustomerDetails;