import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import globals from '../../globals';

import {Tabs, Tab} from 'react-bootstrap';

import "./claims.css";
import ClaimsTable from '../ClaimsTable';
import LoadingPage from './LoadingPage';

const Claims = () => {

    const [claims, setClaims] = useState([]);
    const [unapprovedClaims, setUnapprovedClaims] = useState([]);
    const [approvedClaims, setApprovedClaims] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getStuff();
        
    }, []);


    const getStuff= () => {
        getUnapprovedClaims().then((data) => {
            setUnapprovedClaims(data)
            console.log("unapproved loaded");
        })
        
        getApprovedClaims().then((data) => {
            setApprovedClaims(data);
            console.log("approved loaded");
        });

        getAllClaims().then((data) => {
            setClaims(data);
            setDataLoaded(true);
            console.log("all loaded");
        });
    }

    //function that checks if all data has been fetched

    

    const getUnapprovedClaims = async () => {
            const headers = {
              "token": `${Cookies.get("token")}`,
            };
            const url = globals.ip + "/claims/unapproved";
            const response = await axios.get(url, {
              headers: headers,
            });
            return(response.data.claims);
    }

    const getApprovedClaims = async () => {
        const headers = {
            "token": `${Cookies.get("token")}`,
          };
          const url = globals.ip + "/claims/approved";
          const response = await axios.get(url, {
            headers: headers,
          });
          return(response.data.claims);
    }

    const getAllClaims = async () => {
        const headers = {
            "token": `${Cookies.get("token")}`,
          };
          const url = globals.ip + "/claims";
          const response = await axios.get(url, {
            headers: headers,
          });
          return(response.data.claims);
    }

    
        
    const [key, setKey] = useState('unapproved');
    return ( 
        <>
        { dataLoaded ? (
            
        <div className="page claims-page">
            <h1>Claims</h1>
            <Tabs
                className='mb-3' 
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                >
                <Tab eventKey="unapproved" className='claims-tab-item' title="Unapproved">
                    {unapprovedClaims.length > 0 ? <ClaimsTable claims={unapprovedClaims} /> : <p className='text-center'>All claims approved</p>}
                </Tab>
                
                <Tab eventKey="approved" title="Approved">
                    {approvedClaims.length > 0 ? <ClaimsTable claims={approvedClaims} /> : <p className='text-center'>No claims</p>}
                </Tab>

                <Tab eventKey="all" title="All">
                    {claims.length > 0 ? <ClaimsTable claims={claims} /> : <p className='text-center'>Loading</p>}
                </Tab>
            </Tabs>
           
            
        </div>

        ) : (
            <LoadingPage />
        )}
        </>
     );
}
 
export default Claims;