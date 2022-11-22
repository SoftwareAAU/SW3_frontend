import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import globals from "../globals";
import customerTypeMap from "../CustomerTypeMap";

import "./policytable.css";

const PolicyTable = ({policies, id}) => {


    
    const [coverages , setCoverages] = useState([]);

    useEffect(() => {
        getCoverages();
    }, []);


    console.log("id:" + id)

    const navigate = useNavigate();

    const handleRowClick = (row) => {
        console.log("row:" + row.id)
  
      navigate(`/customers/${id}/${row.id}`);
    };

    //get coverages from policy id 
    const getCoverages = async (policyId) => {
        const headers = {
            token: `${Cookies.get("token")}`,
        };

        const url = globals.ip + "/coverages/" + policyId;

        const response = await axios.get(url, {
            headers: headers,
        });
        setCoverages(response.data);
    }
  
    

    return ( 
    
    
        <div>
         <table className="customer-table table table-bordered">
          <thead className="policy-table-head">
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
                        {customerTypeMap[policy.type]}
                     </td>
                 </tr>
                    ))}
                </tbody>
        </table>

    </div> );
}
 
export default PolicyTable;