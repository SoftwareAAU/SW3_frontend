import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import globals from "../../globals";

import * as Icon from 'react-bootstrap-icons';

import "./Customers.css";
import axios from "axios";

import Cookies from "js-cookie";

import "./loadingpage.css"
import CustomersTable from "../CustomersTable";
import AnimatedPage from "../AnimatedPage";

const Customers = () => {
  
  const [customers, setCustomers] = useState([]);

  //test stuff
  const [persons, setPersons] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
 const [filteredPersons, setFilteredPersons] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);


  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    getAllCustomersWithToken();
    getAllCompaniesWithToken();
    getAllPersonsWithToken();
  }, []);

  useEffect(() => {
    
  }, []);

  const getAllPersonsWithToken = async () => {

    const headers = {
      "token": `${Cookies.get("token")}`,
    };
    const url = globals.ip + "/persons";
    const response = await axios.get(url, {
      headers: headers,
    });
    setPersons(response.data.persons);
    setFilteredPersons(response.data.persons);
    console.log("persons-test:\n");
    console.log(response.data.persons);
  }

  const getAllCompaniesWithToken = async () => {
    const headers = {
      "token": `${Cookies.get("token")}`,
    };
    const url = globals.ip + "/companies";
    const response = await axios.get(url, {
      headers: headers,
    });
    setCompanies(response.data.companies);
    setFilteredCompanies(response.data.companies);
    console.log("companies-test:\n")
    console.log(response.data.companies);

  }

  const handleSearch = (e) => {
    const search = e.target.value;
    console.log(search);

    if (filterBy === "all") {

      const currentList = filteredCustomers;
      const newList = currentList.filter((c) => {
        console.log(c.id);
        return c.id.toString().toLowerCase().includes(search.toString().toLowerCase())
      });
      if(search == "")
      {
        setFilteredCustomers(customers);
      }
      else{
      setFilteredCustomers(newList);
      }
    }

    else if (filterBy === "persons") {
      const currentList = filteredPersons;
      const newList = currentList.filter((c) => {
        console.log(c.id);
        return c.id.toString().toLowerCase().includes(search.toString().toLowerCase())
      })

      if(search == "")
      {
        setFilteredPersons(persons);
      }
      else{
      setFilteredPersons(newList);
      }
    }
    else if (filterBy === "companies") {
      const currentList = filteredCompanies;
      const newList = currentList.filter((c) => {
        console.log(c.id);
        return c.id.toString().toLowerCase().includes(search.toString().toLowerCase())
      })

      if(search == "")
      {
        setFilteredCompanies(companies);
      }
      else{
      setFilteredCompanies(newList);
      }
    }
      

  }





  //fetching all customers from the database with token in the body
  const getAllCustomersWithToken = async () => {
 
      const headers = {
        "token": `${Cookies.get("token")}`,
      };

      //correct link
      //130.225.39.66:8080/customers";

      //dev link
      const url = globals.ip + "/customers";

      const response = await axios.get(url, {
        headers: headers,
      });

      setCustomers(response.data.customers);
      setFilteredCustomers(response.data.customers);
      console.log(response.data.customers);
    };

 

  return (
    <AnimatedPage>
    <div className="customers">
      <div className="customer-cards">
        <div className="customer-card-search row">
          <h1 className="link d-flex flex-row align-items-center gap-2"> <Icon.PeopleFill/> Customers</h1>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.Search/> Search
              </label>
              <input
                type="text"
                placeholder="Search"
                className="form-control customer-card-searchbar"
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.SortDown/>  Filter by
              </label>
              <select id="disabledSelect" className="form-select" onChange={(e) => setFilterBy(e.target.value)}>
                <option value={"all"}>All</option>
                <option value={"persons"}>Persons</option>
                <option value={"companies"}>Companies</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">
              <Icon.Funnel/>  Sort by
              </label>
              <select id="disabledSelect" className="form-select">
                <option>Sort by</option>
              </select>
            </div>
          </div>
        </div>
        {filterBy == "all" ? ( <CustomersTable customers={filteredCustomers} />) : (<></>)}
        {filterBy == "persons" ? ( <CustomersTable customers={filteredPersons} />) : (<></>)}
        {filterBy == "companies" ? ( <CustomersTable customers={filteredCompanies} />) : (<></>)}
      </div>
    </div>
    </AnimatedPage>
  );
};

export default Customers;
