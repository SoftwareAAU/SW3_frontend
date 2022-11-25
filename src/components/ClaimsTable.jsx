
import { useNavigate } from "react-router-dom";

import "./claimstable.css";

const ClaimsTable = ({claims}) => {

    const navigate = useNavigate();

    const handleRowClick = (row) => {
        console.log("row:" + row.id)
  
      navigate(`/claims/${row.id}`);
    };

    return ( 
    <div>

        {claims.length > 0 ? (
            <div>
                <table className="customer-table table table-bordered">
          <thead className="page-table-head">
            <tr>
              <th className="p-4 claims-table-text" scope="col">
                Customer ID
              </th>
              <th className="p-4 claims-table-text" scope="col">
                Coverage ID
              </th>
              <th className="p-4" scope="col">
                Claim ID
              </th>
              <th className="p-4" scope="col">
                Claim Creation Date
              </th>
              <th className="p-4" scope="col">
                Claim Occurrence Date
              </th>
            </tr>
          </thead>
            <tbody>
                 {claims.map((claim) => (
                     <tr onClick={() => handleRowClick(claim)}
                     className=" my-4">
                     <td className="p-4">
                         {claim.customer}
                     </td>
                     <td className="p-4">
                         {claim.coverage}
                     </td>
                     <td className="p-4">
                         {claim.id}
                     </td>
                     <td className="p-4">
                        {claim.dateOfClaim}
                        </td>
                     <td className="p-4">
                        {claim.dateOfOccurrence}
                     </td>
                 </tr>
                    ))}
                </tbody>
        </table>


            </div>
            ):(
            <div className="no-claims text-center">
                <h3>No Claims</h3>
            </div>
            )}
        
    </div>
    );
}
 
export default ClaimsTable;

  