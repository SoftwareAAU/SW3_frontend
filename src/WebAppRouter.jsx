import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Customers from "./components/pages/Customers";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Analytics from "./components/pages/Analytics";
import CustomerDetails from "./components/pages/CustomerDetails";
import CreatePolicy from "./components/pages/CreatePolicy";
import CustomerPolicies from "./components/pages/CustomerPolicies";
import CreateCustomer from "./components/pages/CreateCustomer";
import Policies from "./components/pages/Policies";
import Coverage from "./components/pages/Coverage";
import Claims from "./components/pages/Claims";
import ClaimDetails from "./components/pages/ClaimDetails";
import CreateCoverage from "./components/pages/CreateCoverage";

import AllCoverages from "./components/pages/AllCoverages";
import CoverageDetails from "./components/pages/CoverageDetails";
import CreateClaim from "./components/pages/CreateClaim";
import AnimatedPage from "./components/AnimatedPage";

const WebAppRouter = () => {
    return ( <div>

<Row>
      <BrowserRouter className="App">
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col sm={9}>
          <Routes>
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/create/customer" element={<CreateCustomer />} />
            <Route exact path="/customers/:id" element={<CustomerDetails />} />
            <Route exact path="/customers/:id/policies" element={<CustomerPolicies/>} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/policies" element={<Policies />} />
            <Route exact path="/create/policy/:id" element={<CreatePolicy/>} />
            <Route exact path="/customers/:id/:id" element={<Coverage/>} />
            <Route exact path="/customers/:id/:id/:id" element={<CoverageDetails/>} />
            <Route exact path="/claims" element={<Claims/>} />
            <Route exact path="/claims/:id" element={<ClaimDetails/>} />
            <Route exact path="/create/claim/:id" element={<CreateClaim/>} />
            <Route exact path="/create/coverage/:id" element={<CreateCoverage/>} />
            <Route exact path="/coverages" element={<AllCoverages/>} />

            <Route path="/" element={<Navigate to="/customers" />} />
          </Routes>
        </Col>
      </BrowserRouter>
    </Row>

    </div> );
}
 
export default WebAppRouter;