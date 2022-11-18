import { useNavigate } from "react-router-dom";

const PolicyTable = ({policies, id}) => {


    

    console.log("id:" + id)

    /*
    id
    startDate
    terminationDate
    totalPremium
    type
    */

    const navigate = useNavigate();

    const handleRowClick = (row) => {
        console.log("row:" + row.id)
  
      navigate(`/customers/${id}/${row.id}`);
    };
  
    

    return ( <div>
         <table className="customer-table table table-bordered">
          <thead>
            <tr>
              <th className="p-4 customer-table-image" scope="col">
                ID
              </th>
              <th className="p-4" scope="col">
                Start Date
              </th>
              <th className="p-4" scope="col">
                Total Premium
              </th>
              <th className="p-4" scope="col">
                Type
              </th>
            </tr>
          </thead>
            <tbody>
                 {policies.map((policy) => (
                     <tr onClick={() => handleRowClick(policy)}
                     className=" my-4">
                     <td className="p-4">
                         {policy.id}
                     </td>
                     <td className="p-4">
                         {policy.terminationDate}
                     </td>
                     <td className="p-4">
                        {policy.totalPremium}
                        </td>
                     <td className="p-4">
                        {policy.type}
                     </td>
                 </tr>
                    ))}
               
                </tbody>
        </table>

    </div> );
}
 
export default PolicyTable;