import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import globals from '../../globals';

import {Tabs, Tab} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import {Col, Row} from 'react-bootstrap';

import * as Icon from 'react-bootstrap-icons';

import "./claims.css";
import ClaimsTable from '../ClaimsTable';
import LoadingPage from './LoadingPage';
import AnimatedPage from '../AnimatedPage';

const Claims = () => {

    const [filterBy, setFilterBy] = useState(["unapproved"]);

    const [claims, setClaims] = useState([]);
    const [unapprovedClaims, setUnapprovedClaims] = useState([]);
    const [approvedClaims, setApprovedClaims] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getStuff()
        
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
            setDataLoaded(true);
            setClaims(data);
            
            console.log("all loaded");
        });
    }

    

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

    //navigation

    
        
    const [key, setKey] = useState('unapproved');
    return ( 
        <AnimatedPage>
        { dataLoaded ? (
        <div className='customers'>
             <div className="customer-cards">
        <Row className="customer-card-search">
          <h1 className="link d-flex flex-row align-items-center gap-2"> <Icon.BookmarksFill  size={30}/> Claims</h1>
          <Col>
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.Search/> Search
              </label>
              <input 
                type="text" 
                placeholder="Search"
                className="form-control customer-card-searchbar"
                onChange={e => console.log(e)}
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.SortDown/> Filter by
              </label>
              <select id="disabledSelect" className="form-select" onChange={(e) => setFilterBy(e.target.value)}>
                <option value={"unapproved"} >Unapproved Claims</option>
                <option value={"approved"}>Approved Claims</option>
                <option value={"all"}>All Claims</option>
              </select>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.Funnel /> Sort by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Sort by</option>
              </select>
            </div>
          </Col>
        </Row>
       
        {filterBy == "unapproved" ? (
          (unapprovedClaims.length > 0) ? <ClaimsTable claims={unapprovedClaims} /> : <p className='text-center'>No Unapproved Claims</p>
        ) : (<div></div>)}

        {filterBy == "approved" ? (
          (approvedClaims.length > 0 ? <ClaimsTable claims={approvedClaims} /> : <p className='text-center'>No Approved Claims</p>)
        ) : (<div></div>)}

        {filterBy == "all" ? (
          (claims.length > 0 ? <ClaimsTable claims={claims} /> : <p className='text-center'>No Claims</p>)
        ) : (<div></div>)}
          
      </div>
        </div>
        ) : (
            <LoadingPage />
        )}
        </AnimatedPage>
     );
}
 
export default Claims;