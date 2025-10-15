import React, { useState, useEffect } from 'react';
import { authService } from '../services/auth';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    phone: '',
    joiningDate: ''
  });

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await authService.getEmployees();
      setEmployees(data.employees || []);
    } catch (error) {
      console.error('Error loading employees:', error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await authService.deleteEmployee(employeeId);
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      }
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      // Generate employee ID
      const newEmployeeId = `ZIC${String(employees.length + 1).padStart(3, '0')}`;
      
      const employeeData = {
        ...formData,
        employeeId: newEmployeeId
      };

      await authService.addEmployee(employeeData);
      setShowAddForm(false);
      setFormData({
        name: '',
        email: '',
        designation: '',
        department: '',
        phone: '',
        joiningDate: ''
      });
      loadEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-management">
      {/* Search and Filters */}
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters">
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="filter-select">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Management</option>
            <option>Design</option>
            <option>Sales</option>
            <option>HR</option>
          </select>
        </div>
      </div>

      {/* Header with Add Button */}
      <div className="section-header">
        <h3>Employees ({filteredEmployees.length})</h3>
        <button
          className="add-employee-btn"
          onClick={() => setShowAddForm(true)}
        >
          <span className="btn-icon">+</span>
          Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="employees-table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Phone</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="loading-cell">
                  Loading employees...
                </td>
              </tr>
            ) : filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-cell">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map(employee => (
                <tr key={employee._id || employee.employeeId} className="employee-row">
                  <td>
                    <div className="employee-info">
                      <div className="employee-id">{employee.employeeId}</div>
                    </div>
                  </td>
                  <td>
                    <div className="employee-info">
                      <div className="employee-name">{employee.name}</div>
                      <div className="employee-email">{employee.email}</div>
                    </div>
                  </td>
                  <td>{employee.designation}</td>
                  <td>
                    <span className="department-badge">{employee.department}</span>
                  </td>
                  <td>{employee.phone}</td>
                  <td>{employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => alert('Edit functionality would go here')}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteEmployee(employee.employeeId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Popup */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="employee-form">
              <div className="form-group">
                <label htmlFor="employeeId">Employee ID</label>
                <input
                  type="text"
                  id="employeeId"
                  value={`ZIC${String(employees.length + 1).padStart(3, '0')}`}
                  disabled
                  className="disabled-input"
                />
                <small>Auto-generated unique ID</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter employee name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="designation">Designation *</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter designation"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Design">Design</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="joiningDate">Joining Date *</label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;