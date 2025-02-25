import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css';
import { Link } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost/interviewquestion/employee-management-backend/index.php');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost/interviewquestion/employee-management-backend/index.php?id=${id}`);
                setEmployees(employees.filter(employee => employee.id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <div className='employee-list-container'>
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Hire Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td title={employee.id}>{employee.id}</td> {/* Add title attribute */}
                            <td title={employee.employee_name}>{employee.employee_name}</td>
                            <td title={employee.email}>{employee.email}</td>
                            <td title={employee.phone_no}>{employee.phone_no}</td>
                            <td title={employee.department}>{employee.department}</td>
                            <td title={employee.position}>{employee.position}</td>
                            <td title={employee.hire_date}>{employee.hire_date}</td>
                            <td>
                                <Link to={`/edit-employee/${employee.id}`} className="button edit">Edit</Link>
                                <button className="delete" onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;