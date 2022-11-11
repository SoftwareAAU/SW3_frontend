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

function App() {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
    <Row>
      <BrowserRouter className="App">
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col sm={9}>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/customers/:id" element={<CustomerDetails />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/create/policy" element={<CreatePolicy />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Col>
      </BrowserRouter>
    </Row>
  );
}

export default App;
