import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from "./components/Employee/EmployeeList.jsx";
import Dashboard from "./components/Dashboard.jsx";

const App = () => (
    <Router>
        <div style={{ padding: 10 }}>
            <nav style={{ marginBottom: 5 }}>
                <Link to="/" style={{ marginRight: 10 }}>Dashboard</Link>
                <Link to="/employees">Employees</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
            </Routes>
        </div>
    </Router>
);

export default App;
