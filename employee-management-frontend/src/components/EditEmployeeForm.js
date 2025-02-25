import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeForm.css';

function EditEmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employee_name: '',
        gender: '',
        martial_status: '',
        phone_no: '',
        email: '',
        address: '',
        date_of_birth: '',
        nationality: '',
        hire_date: '',
        department: '',
        position: '',
        salary: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost/interviewquestion/employee-management-backend/index.php?id=${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
                navigate('/employees');
            }
        };

        fetchEmployee();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await axios.put(`http://localhost/interviewquestion/employee-management-backend/index.php?id=${id}`, formData);
            console.log('Employee updated:', response.data);
            navigate('/employees');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating employee:', error);
            }
        }
    };


    return (
        <div className='employee-form-container'>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit} className='employee-form'>
                <div className='form-group'>
                    <label htmlFor="employee_name">Employee Name:</label>
                    <input
                        type="text"
                        id="employee_name"
                        name="employee_name"
                        value={formData.employee_name}
                        onChange={handleChange}
                        maxLength="50"
                        className={errors.employee_name ? 'input-error' : ''}
                    />
                    {errors.employee_name && <div className="error-message">{errors.employee_name}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'input-error' : ''}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="error-message">{errors.gender}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="martial_status">Marital Status:</label>
                    <select id="martial_status" name="martial_status" value={formData.martial_status} onChange={handleChange}  className={errors.martial_status ? 'input-error' : ''}>
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                    {errors.martial_status && <div className="error-message">{errors.martial_status}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="phone_no">Phone Number:</label>
                    <input
                        type="text"
                        id="phone_no"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleChange}
                        maxLength="20"
                        className={errors.phone_no ? 'input-error' : ''}
                    />
                    {errors.phone_no && <div className="error-message">{errors.phone_no}</div>}
                </div>

                <div className='form-group'>
                     <label htmlFor="email">Email:</label>
                     <input
                         type="email"
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                        maxLength="255"
                         className={errors.email ? 'input-error' : ''}
                     />
                     {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                 <div className='form-group'>
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        maxLength="255"
                        className={errors.address ? 'input-error' : ''}
                    />
                    {errors.address && <div className="error-message">{errors.address}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className={errors.date_of_birth ? 'input-error' : ''}
                    />
                    {errors.date_of_birth && <div className="error-message">{errors.date_of_birth}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="nationality">Nationality:</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        maxLength="50"
                        className={errors.nationality ? 'input-error' : ''}
                    />
                    {errors.nationality && <div className="error-message">{errors.nationality}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="hire_date">Hire Date:</label>
                    <input
                        type="date"
                        id="hire_date"
                        name="hire_date"
                        value={formData.hire_date}
                        onChange={handleChange}
                        className={errors.hire_date ? 'input-error' : ''}
                    />
                    {errors.hire_date && <div className="error-message">{errors.hire_date}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        maxLength="50"
                        className={errors.department ? 'input-error' : ''}
                    />
                    {errors.department && <div className="error-message">{errors.department}</div>}
                </div>
                <div className='form-group'>
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} maxLength="50" className={errors.position ? 'input-error' : ''}/>
                    {errors.position && <div className="error-message">{errors.position}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor="salary">Salary:</label>
                    <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange}  className={errors.salary ? 'input-error' : ''} />
                    {errors.salary && <div className="error-message">{errors.salary}</div>}
                </div>

                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EditEmployeeForm;