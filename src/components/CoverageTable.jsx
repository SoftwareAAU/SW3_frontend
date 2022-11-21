import { useNavigate } from "react-router-dom";
import "./CoverageTable.css";

const CoverageTable = ({coverages}) => {


    console.log(coverages[0])

    const navigate = useNavigate();

    const handleRowClick = (row) => {
        console.log("row:" + row.id)
  
    //   navigate(`/customers/${id}/${row.id}`);
    };
  
    

    return ( <div>
         <table className="customer-table table table-bordered">
          <thead>
            <tr>
              <th className="p-3 customer-table-image" scope="col">
                ID
              </th>
              <th className="p-3" scope="col">
                Start Date
              </th>
              <th className="p-3" scope="col">
                Termination Date
              </th>
              <th className="p-3 text" scope="col">
                Premium
              </th>
              <th className="p-3" scope="col">
                Deductible
              </th>
              <th className="p-3" scope="col">
                Maximum Coverage
              </th>
              <th className="p-3" scope="col">
                Claimed Amount
              </th>
              <th className="p-3" scope="col">
                Insurance Type
              </th>
            </tr>
          </thead>
            <tbody>
            {coverages.map((coverage) => (
                     <tr onClick={() => handleRowClick(coverages)}
                     className=" my-4">
                     <td className="p-4">
                         {coverage.id}
                     </td>
                     <td className="p-4">
                         {coverage.startDate}
                     </td>
                     <td className="p-4">
                        {coverage.terminationDate}
                        </td>
                     <td className="p-4">
                        {coverage.premium}
                     </td>
                     <td className="p-4">
                        {coverage.deductible}
                     </td>
                     <td className="p-4">
                        {coverage.maxCoverage}
                     </td>
                     <td className="p-4">
                        {coverage.currentClaimAmount}
                     </td>
                     <td className="p-4">
                        {coverage.type}
                     </td>
                 </tr>
                    ))}
                </tbody>
                    
        </table>
    </div> );
}
 
export default CoverageTable;