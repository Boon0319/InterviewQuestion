import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EditEmployeeForm from './components/EditEmployeeForm'; 
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Employee Management</h1>
                <Routes>
                    <Route path="/" element={<EmployeeForm />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/edit-employee/:id" element={<EditEmployeeForm />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;