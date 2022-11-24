import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
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
import WebAppRouter from "./WebAppRouter";
import RouterOrLoading from "./components/pages/RouterOrLoading";

function App() {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    if (Cookies.get("token")) {
      setToken(Cookies.get("token"));
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return <Login></Login>;
  }

  return (
   
   <RouterOrLoading/>
  );
}

export default App;
