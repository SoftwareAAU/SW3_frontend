import personLogo from "../assets/person.png";
import firmLogo from "../assets/firm.png";
import { useNavigate } from "react-router-dom";

const CustomersTable = ({customers}) => {

    const navigate = useNavigate();
  
    const handleRowClick = (row) => {
      navigate(`/customers/${row.id}`);
    };

    return ( 
        <table className="customer-table table table-bordered">
        <thead>
          <tr>
            <th className="p-4 customer-table-image" scope="col">
              Type
            </th>
            <th className="p-4" scope="col">
              Name
            </th>
            <th className="p-4" scope="col">
              Customer ID
            </th>
            <th className="p-4" scope="col">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
        {customers && customers.length > 0 ? (
          customers.map((customer) => (
            <tr
              key={customer.id}
              className=" my-4"
              onClick={() => handleRowClick(customer)}>
              <td className="p-4">
                <img
                  height={40}
                  src={customer.type == 0 ? personLogo : firmLogo}
                  alt=""
                />
              </td>
              <td className="p-4">
                {customer.type == 0? 
                  (
                    customer.firstName +"\n"+ customer.surname)
                  : customer.companyName}
                
              </td>
              <td className="p-4">{customer.customer}</td>
              <td className="p-4">{customer.address}</td>
            </tr>
          ))
        ) : (
          <>
          <tr>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
          </tr>
          <tr>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
          </tr>
          <tr>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
            <td><div className="spinner-grow loading-page-colors"></div></td>
          </tr>
      
          </>
        )}
        </tbody>
      </table>
     );
}
 
export default CustomersTable;