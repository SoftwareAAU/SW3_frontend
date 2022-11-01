import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import Sidebar from "./components/Sidebar";
import Customers from './components/page-components/Customers';
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Row className="page">
        <Col sm={3}>
          <Sidebar />
        </Col>
        <Col sm={9}>
        
    
      <BrowserRouter className="App">
        <Routes>
          <Route exact path="/" element={ <Dashboard />} />
          <Route exact path="/customers" element={ <Customers />} />
          <Route exact path="/customers/:id" element={ <Customers />} />
        </Routes>
      </BrowserRouter>
    </Col>
    </Row>
  );
}

export default App;
