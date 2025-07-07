import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from "./components/Employee/EmployeeList.jsx";
import Dashboard from "./components/Dashboard.jsx";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            {/* Add more routes later */}
        </Routes>
    </Router>
);

export default App;
