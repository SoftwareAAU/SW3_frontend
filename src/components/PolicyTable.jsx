const PolicyTable = (policies) => {


    console.log(policies.policies[0])

    /*
    id
    startDate
    terminationDate
    totalPremium
    type
    */
    

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
                 
                <tr

                    className=" my-4">
                    <td className="p-4">
                        test
                    </td>
                    <td className="p-4">
                        test2
                    </td>
                    <td className="p-4">test3</td>
                    <td className="p-4">test4</td>
                </tr>
                </tbody>
        </table>

    </div> );
}
 
export default PolicyTable;