import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import globals from "../../globals";


import "./Customers.css";
import axios from "axios";

import Cookies from "js-cookie";

import * as Icon from 'react-bootstrap-icons';

import "./loadingpage.css"
import CustomersTable from "../CustomersTable";
import CoverageTable from "../CoverageTable";
import AllCoveragesTable from "../AllCoveragesTable";

const AllCoverages = () => {
  
  const [coverages, setCoverages] = useState([]);

  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    getCoveragesWithToken();
 
  }, []);

  const getCoveragesWithToken = async () => {

    const headers = {
      "token": `${Cookies.get("token")}`,
    };
    const url = globals.ip + "/coverages";
    const response = await axios.get(url, {
      headers: headers,
    });
    setCoverages(response.data.coverages);
    console.log("coverages-test:\n");
    console.log(response.data.coverages);
  }




 

  return (
    <div className="customers">
      <div className="customer-cards">
        <div className="customer-card-search row">
          <h1 className="link d-flex flex-row align-items-center gap-2"> <Icon.ClipboardFill/> Coverages</h1>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.Search/> Search
              </label>
              <input
                type="text"
                placeholder="Search"
                className="form-control customer-card-searchbar"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.SortDown/> Filter by
              </label>
              <select id="disabledSelect" className="form-select" onChange={(e) => setFilterBy(e.target.value)}>
                <option value={"all"}>All</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.Funnel/> Sort by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Sort by</option>
              </select>
            </div>
          </div>
          <hr />
        </div>
        {filterBy == "all" ? ( <AllCoveragesTable coverages={coverages} />) : (<></>)}
      
      </div>
    </div>
  );
};

export default AllCoverages;

