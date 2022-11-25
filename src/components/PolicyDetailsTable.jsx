import personLogo from "../assets/person.png";
import firmLogo from "../assets/firm.png";
import { useNavigate } from "react-router-dom";

const PolicyDetailsTable = ({coverages}) => {

    const navigate = useNavigate();
  
    const handleRowClick = (row) => {
        //navigate to coverage details page
      navigate(`/customers/${row.customer}/${row.policy}/${row.id}`);
    };

    return ( 
        <table className="customer-table table table-bordered">
        <thead >
          <tr>
            <th className="p-2  py-3" scope="col">
              Coverage ID
            </th>
            <th className="p-2  py-3" scope="col">
              Customer ID
            </th>
            <th className="p-2  py-3" scope="col">
              Policy ID
            </th>
            <th className="p-2 py-3" scope="col">
              Start
            </th>
            <th className="p-2 py-3" scope="col">
              Termination
            </th>
            <th className="p-2 py-3" scope="col">
              Type
            </th>
            <th className="p-2 py-3" scope="col">
              Premium
            </th>
            <th className="p-2 py-3" scope="col">
              Currently Claimed
            </th>
            <th className="p-2 py-3" scope="col">
              Deductible
            </th>
          </tr>
        </thead>
        <tbody>
        {coverages && coverages.length > 0 ? (
          coverages.map((coverage) => (
            <tr
              key={coverage.id}
              className=" my-4"
              onClick={() => handleRowClick(coverage)}>
              <td className="p-2 py-3">{coverage.id}</td>
              <td className="p-2 py-3">{coverage.customer}</td>
              <td className="p-2 py-3">{coverage.policy}</td>
              <td className="p-2 py-3">{coverage.startDate}</td>
              <td className="p-2 py-3">{coverage.terminationDate}</td>
              <td className="p-2 py-3">{coverage.type}</td>
              <td className="p-2 py-3">{coverage.premium}</td>
              <td className="p-2 py-3">{coverage.currentClaimAmount}/{coverage.maxCoverage}</td>
              <td className="p-2 py-3">{coverage.deductible}</td>
            
            </tr>
          ))
        ) : (
          <>
          <tr>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
          </tr>
          <tr>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
            <td><div className="spinner-grow loading-page-colors p-2"></div></td>
          </tr>
          </>
        )}
        </tbody>
      </table>
     );
}
 
export default PolicyDetailsTable;

// currentClaimAmount
// customer
// id
// deductible
// maxCoverage
// premium
// startDate
// terminationDate
// type

