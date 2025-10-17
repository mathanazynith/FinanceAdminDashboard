import React, { useState, useEffect } from 'react';
import './SalaryManagement.css';

const SalaryManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPayslipHistory, setShowPayslipHistory] = useState(false);
  const [selectedEmployeeHistory, setSelectedEmployeeHistory] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    basicSalary: 0,
    paidDays: 22,
    lopDays: 0,
    totalLeaves: 22,
    leavesTaken: 0,
    remainingLeaves: 22,
    earnings: [{ type: 'Basic Salary', amount: 0 }],
    deductions: []
  });

  // Mock employee data
  useEffect(() => {
    const mockEmployees = [
      { 
        employeeId: 'ZIC001', 
        name: 'mohammed abu bakkar', 
        email: 'mmabu135@gmail.com', 
        designation: 'Senior Developer',
        department: 'Engineering'
      },
      { 
        employeeId: 'ZIC002', 
        name: 'John Doe', 
        email: 'john@example.com', 
        designation: 'UI/UX Designer',
        department: 'Design'
      },
      { 
        employeeId: 'ZIC003', 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        designation: 'Project Manager',
        department: 'Management'
      },
      { 
        employeeId: 'ZIC004', 
        name: 'Mike Johnson', 
        email: 'mike@example.com', 
        designation: 'DevOps Engineer',
        department: 'Engineering'
      }
    ];
    setEmployees(mockEmployees);

    // Mock salary records
    const mockSalaryRecords = [
      {
        id: '1',
        employeeId: 'ZIC001',
        name: 'mohammed abu bakkar',
        email: 'mmabu135@gmail.com',
        designation: 'Senior Developer',
        month: 'October',
        year: 2025,
        basicSalary: 6500,
        grossEarnings: 6600,
        totalDeductions: 0,
        netPay: 6600,
        paidDays: 22,
        lopDays: 0,
        totalLeaves: 22,
        leavesTaken: 2,
        remainingLeaves: 20,
        status: 'draft',
        payDate: new Date('2025-10-31'),
        earnings: [{ type: 'Basic Salary', amount: 6500 }, { type: 'Bonus', amount: 100 }],
        deductions: []
      },
      {
        id: '2',
        employeeId: 'ZIC002',
        name: 'John Doe',
        email: 'john@example.com',
        designation: 'UI/UX Designer',
        month: 'October',
        year: 2025,
        basicSalary: 5500,
        grossEarnings: 5500,
        totalDeductions: 450,
        netPay: 5050,
        paidDays: 21,
        lopDays: 1,
        totalLeaves: 22,
        leavesTaken: 3,
        remainingLeaves: 19,
        status: 'paid',
        payDate: new Date('2025-10-31'),
        earnings: [{ type: 'Basic Salary', amount: 5500 }],
        deductions: [{ type: 'Tax', amount: 450 }]
      },
      {
        id: '3',
        employeeId: 'ZIC003',
        name: 'Jane Smith',
        email: 'jane@example.com',
        designation: 'Project Manager',
        month: 'October',
        year: 2025,
        basicSalary: 8000,
        grossEarnings: 8200,
        totalDeductions: 1200,
        netPay: 7000,
        paidDays: 22,
        lopDays: 0,
        totalLeaves: 22,
        leavesTaken: 1,
        remainingLeaves: 21,
        status: 'paid',
        payDate: new Date('2025-10-31'),
        earnings: [{ type: 'Basic Salary', amount: 8000 }, { type: 'Performance Bonus', amount: 200 }],
        deductions: [{ type: 'Tax', amount: 1000 }, { type: 'Insurance', amount: 200 }]
      }
    ];
    setSalaryRecords(mockSalaryRecords);
  }, []);

  // Calculate derived values
  const grossEarnings = formData.basicSalary + (formData.earnings?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0);
  const totalDeductions = formData.deductions?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
  const netPay = grossEarnings - totalDeductions;

  // Check if employee already has a salary record for the selected month
  const isDuplicateRecord = (employeeId, month, year, excludeId = null) => {
    return salaryRecords.some(record => 
      record.employeeId === employeeId && 
      record.month === month && 
      record.year === year &&
      record.id !== excludeId
    );
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployee(employeeId);
    const employee = employees.find(emp => emp.employeeId === employeeId);
    if (employee) {
      const defaultSalary = getDefaultSalary(employee.designation);
      setFormData(prev => ({
        ...prev,
        employeeId,
        basicSalary: defaultSalary,
        earnings: [{ type: 'Basic Salary', amount: defaultSalary }]
      }));
    }
  };

  const getDefaultSalary = (designation) => {
    const salaryMap = {
      'Senior Developer': 6500,
      'UI/UX Designer': 5500,
      'Project Manager': 8000,
      'DevOps Engineer': 7000
    };
    return salaryMap[designation] || 5000;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Calculate remaining leaves when leavesTaken changes
    if (field === 'leavesTaken') {
      const leavesTaken = Number(value) || 0;
      setFormData(prev => ({
        ...prev,
        remainingLeaves: prev.totalLeaves - leavesTaken,
        paidDays: prev.paidDays // Keep paid days as is since it's now editable
      }));
    }

    // Calculate paid days when LOP days change
    if (field === 'lopDays') {
      const lopDays = Number(value) || 0;
      setFormData(prev => ({
        ...prev,
        paidDays: 22 - prev.leavesTaken - lopDays
      }));
    }

    // Update basic salary in earnings when basicSalary changes
    if (field === 'basicSalary') {
      const updatedEarnings = [...formData.earnings];
      if (updatedEarnings.length > 0 && updatedEarnings[0].type === 'Basic Salary') {
        updatedEarnings[0].amount = Number(value) || 0;
      }
      setFormData(prev => ({
        ...prev,
        earnings: updatedEarnings
      }));
    }
  };

  const handleEarningChange = (index, field, value) => {
    const updatedEarnings = [...formData.earnings];
    updatedEarnings[index][field] = field === 'amount' ? Number(value) || 0 : value;
    setFormData(prev => ({
      ...prev,
      earnings: updatedEarnings
    }));
  };

  const handleDeductionChange = (index, field, value) => {
    const updatedDeductions = [...formData.deductions];
    updatedDeductions[index][field] = field === 'amount' ? Number(value) || 0 : value;
    setFormData(prev => ({
      ...prev,
      deductions: updatedDeductions
    }));
  };

  const addEarning = () => {
    setFormData(prev => ({
      ...prev,
      earnings: [...prev.earnings, { type: '', amount: 0 }]
    }));
  };

  const removeEarning = (index) => {
    if (formData.earnings.length > 1 && formData.earnings[index].type !== 'Basic Salary') {
      setFormData(prev => ({
        ...prev,
        earnings: prev.earnings.filter((_, i) => i !== index)
      }));
    }
  };

  const addDeduction = () => {
    setFormData(prev => ({
      ...prev,
      deductions: [...prev.deductions, { type: '', amount: 0 }]
    }));
  };

  const removeDeduction = (index) => {
    setFormData(prev => ({
      ...prev,
      deductions: prev.deductions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for duplicate record
    if (isDuplicateRecord(formData.employeeId, formData.month, formData.year, editingRecord?.id)) {
      alert('A salary record already exists for this employee for the selected month and year!');
      return;
    }

    const employee = employees.find(emp => emp.employeeId === formData.employeeId);
    const salaryData = {
      ...formData,
      grossEarnings,
      totalDeductions,
      netPay,
      name: employee?.name,
      email: employee?.email,
      designation: employee?.designation,
      status: 'draft',
      payDate: new Date()
    };

    try {
      if (editingRecord) {
        // Update existing record
        setSalaryRecords(prev => 
          prev.map(record => 
            record.id === editingRecord.id 
              ? { ...salaryData, id: editingRecord.id }
              : record
          )
        );
        alert('Salary record updated successfully!');
      } else {
        // Add new record
        const newRecord = {
          ...salaryData,
          id: Date.now().toString()
        };
        setSalaryRecords(prev => [newRecord, ...prev]);
        alert('Salary record added successfully!');
      }
      
      setShowAddForm(false);
      resetForm();
      setEditingRecord(null);
    } catch (error) {
      console.error('Error saving salary record:', error);
      alert('Error saving salary record');
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      basicSalary: 0,
      paidDays: 22,
      lopDays: 0,
      totalLeaves: 22,
      leavesTaken: 0,
      remainingLeaves: 22,
      earnings: [{ type: 'Basic Salary', amount: 0 }],
      deductions: []
    });
    setSelectedEmployee('');
  };

  const editSalaryRecord = (record) => {
    setEditingRecord(record);
    setFormData({
      employeeId: record.employeeId,
      month: record.month,
      year: record.year,
      basicSalary: record.basicSalary,
      paidDays: record.paidDays,
      lopDays: record.lopDays,
      totalLeaves: record.totalLeaves,
      leavesTaken: record.leavesTaken,
      remainingLeaves: record.remainingLeaves,
      earnings: record.earnings,
      deductions: record.deductions
    });
    setSelectedEmployee(record.employeeId);
    setShowAddForm(true);
  };

  const deleteSalaryRecord = (recordId) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      setSalaryRecords(prev => prev.filter(record => record.id !== recordId));
    }
  };

  const sendPayslip = (recordId) => {
    if (window.confirm('Are you sure you want to send this payslip? This will mark the record as paid.')) {
      setSalaryRecords(prev => 
        prev.map(record => 
          record.id === recordId 
            ? { ...record, status: 'paid' }
            : record
        )
      );
      alert('Payslip sent successfully and status updated to Paid!');
    }
  };

  const downloadPayslip = (recordId) => {
    const record = salaryRecords.find(r => r.id === recordId);
    if (record) {
      alert(`Downloading payslip for ${record.name} - ${record.month} ${record.year}`);
      // In a real application, this would generate and download a PDF
    }
  };

  const viewPayslipHistory = (employee) => {
    setSelectedEmployeeHistory(employee);
    setShowPayslipHistory(true);
  };

  const getEmployeePayslipHistory = (employeeId) => {
    return salaryRecords
      .filter(record => record.employeeId === employeeId)
      .sort((a, b) => new Date(b.year, months.indexOf(b.month)) - new Date(a.year, months.indexOf(a.month)));
  };

  // Get unique employees for main table (show only latest record per employee)
  const getUniqueEmployeeRecords = () => {
    const latestRecords = {};
    
    salaryRecords.forEach(record => {
      if (!latestRecords[record.employeeId] || 
          new Date(record.year, months.indexOf(record.month)) > 
          new Date(latestRecords[record.employeeId].year, months.indexOf(latestRecords[record.employeeId].month))) {
        latestRecords[record.employeeId] = record;
      }
    });
    
    return Object.values(latestRecords);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { class: 'status-draft', label: 'Draft' },
      paid: { class: 'status-paid', label: 'Paid' },
      overdue: { class: 'status-overdue', label: 'Overdue' }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="salary-management">
      {/* Header Section */}
      <div className="management-header">
        <div className="header-actions">
          <button 
            className="btn-primary"
            onClick={() => {
              setEditingRecord(null);
              setShowAddForm(true);
            }}
          >
            + Add Salary Record
          </button>
        </div>
      </div>

      {/* Records Table */}
      <div className="records-section">
        <div className="table-container">
          <table className="salary-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Designation</th>
                <th>Net Pay</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getUniqueEmployeeRecords().map(record => (
                <tr key={record.id} className="table-row">
                  <td>
                    <div className="employee-cell">
                      <div className="employee-avatar">
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="employee-details">
                        <span className="employee-name">{record.name}</span>
                        <span className="employee-email">{record.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="employee-id">{record.employeeId}</span>
                  </td>
                  <td>
                    <span className="designation">{record.designation}</span>
                  </td>
                  <td>
                    <span className="net-pay">${record.netPay.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="period">{record.month} {record.year}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-history"
                        onClick={() => viewPayslipHistory({
                          id: record.employeeId,
                          name: record.name,
                          designation: record.designation
                        })}
                        title="View Payment History"
                      >
                        History
                      </button>
                      <button 
                        className="btn-edit"
                        onClick={() => editSalaryRecord(record)}
                        title="Edit Record"
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => deleteSalaryRecord(record.id)}
                        title="Delete Record"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {salaryRecords.length === 0 && (
            <div className="empty-table">
              <p>No salary records found. Add your first salary record.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Salary Record Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingRecord ? 'Edit Salary Record' : 'Add Salary Record'}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                  setEditingRecord(null);
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="salary-form">
              <div className="form-section">
                <label className="form-label">Select Employee *</label>
                <select
                  value={selectedEmployee}
                  onChange={(e) => handleEmployeeSelect(e.target.value)}
                  className="form-select"
                  required
                  disabled={!!editingRecord}
                >
                  <option value="">Choose an employee</option>
                  {employees.map(emp => (
                    <option key={emp.employeeId} value={emp.employeeId}>
                      {emp.name} ({emp.employeeId}) - {emp.designation}
                    </option>
                  ))}
                </select>
                {editingRecord && (
                  <div className="form-note">
                    Employee selection is disabled in edit mode
                  </div>
                )}
              </div>

              <div className="form-section">
                <h3 className="section-title">Salary Period</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">MONTH *</label>
                    <select
                      value={formData.month}
                      onChange={(e) => handleInputChange('month', e.target.value)}
                      className="form-select"
                      required
                      disabled={!!editingRecord}
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    {editingRecord && (
                      <div className="form-note">
                        Month selection is disabled in edit mode
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">YEAR *</label>
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', Number(e.target.value))}
                      className="form-select"
                      required
                      disabled={!!editingRecord}
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {editingRecord && (
                      <div className="form-note">
                        Year selection is disabled in edit mode
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Attendance & Leaves</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">TOTAL LEAVES</label>
                    <input
                      type="number"
                      value={formData.totalLeaves}
                      onChange={(e) => handleInputChange('totalLeaves', Number(e.target.value))}
                      className="form-input"
                      min="0"
                      max="31"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LEAVES TAKEN</label>
                    <input
                      type="number"
                      value={formData.leavesTaken}
                      onChange={(e) => handleInputChange('leavesTaken', Number(e.target.value))}
                      className="form-input"
                      min="0"
                      max={formData.totalLeaves}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">REMAINING LEAVES</label>
                    <input
                      type="number"
                      value={formData.remainingLeaves}
                      className="form-input"
                      readOnly
                      style={{ backgroundColor: '#f8fafc', color: '#666' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LOP DAYS</label>
                    <input
                      type="number"
                      value={formData.lopDays}
                      onChange={(e) => handleInputChange('lopDays', Number(e.target.value))}
                      className="form-input"
                      min="0"
                      max="31"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PAID DAYS *</label>
                    <input
                      type="number"
                      value={formData.paidDays}
                      onChange={(e) => handleInputChange('paidDays', Number(e.target.value))}
                      className="form-input"
                      min="0"
                      max="31"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Salary Components</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">BASIC SALARY *</label>
                    <input
                      type="number"
                      value={formData.basicSalary}
                      onChange={(e) => handleInputChange('basicSalary', Number(e.target.value))}
                      className="form-input"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Earnings Breakdown</h3>
                {formData.earnings.map((earning, index) => (
                  <div key={index} className="dynamic-item">
                    <input
                      type="text"
                      placeholder="Earning type"
                      value={earning.type}
                      onChange={(e) => handleEarningChange(index, 'type', e.target.value)}
                      className="form-input"
                      disabled={earning.type === 'Basic Salary'}
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={earning.amount}
                      onChange={(e) => handleEarningChange(index, 'amount', Number(e.target.value))}
                      className="form-input"
                      min="0"
                    />
                    {formData.earnings.length > 1 && earning.type !== 'Basic Salary' && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeEarning(index)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={addEarning}>
                  + Add Earning
                </button>
              </div>

              <div className="form-section">
                <h3 className="section-title">Deductions</h3>
                {formData.deductions.map((deduction, index) => (
                  <div key={index} className="dynamic-item">
                    <input
                      type="text"
                      placeholder="Deduction type"
                      value={deduction.type}
                      onChange={(e) => handleDeductionChange(index, 'type', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={deduction.amount}
                      onChange={(e) => handleDeductionChange(index, 'amount', Number(e.target.value))}
                      className="form-input"
                      min="0"
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeDeduction(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={addDeduction}>
                  + Add Deduction
                </button>
              </div>

              <div className="salary-summary">
                <h3 className="section-title">Salary Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>Gross Earnings:</span>
                    <span>${grossEarnings.toFixed(2)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Total Deductions:</span>
                    <span>${totalDeductions.toFixed(2)}</span>
                  </div>
                  <div className="summary-item net-pay-summary">
                    <span>Net Pay:</span>
                    <span>${netPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                    setEditingRecord(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingRecord ? 'Update Salary Record' : 'Save Salary Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payslip History Modal */}
      {showPayslipHistory && selectedEmployeeHistory && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header history-header">
              <div className="history-header-content">
                <h2>Payment History - {selectedEmployeeHistory.name}</h2>
                <span className="employee-designation">{selectedEmployeeHistory.designation}</span>
              </div>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowPayslipHistory(false);
                  setSelectedEmployeeHistory(null);
                }}
              >
                ×
              </button>
            </div>

            <div className="payslip-history">
              <div className="history-table-container">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Basic Salary</th>
                      <th>Gross Earnings</th>
                      <th>Deductions</th>
                      <th>Net Pay</th>
                      <th>Paid Days</th>
                      <th>LOP Days</th>
                      <th>Leaves Taken</th>
                      <th>Remaining Leaves</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getEmployeePayslipHistory(selectedEmployeeHistory.id).map(record => (
                      <tr key={record.id}>
                        <td>{record.month} {record.year}</td>
                        <td>${record.basicSalary.toLocaleString()}</td>
                        <td>${record.grossEarnings.toLocaleString()}</td>
                        <td>${record.totalDeductions.toLocaleString()}</td>
                        <td><strong>${record.netPay.toLocaleString()}</strong></td>
                        <td>{record.paidDays}</td>
                        <td>{record.lopDays}</td>
                        <td>{record.leavesTaken}</td>
                        <td>{record.remainingLeaves}</td>
                        <td>{getStatusBadge(record.status)}</td>
                        <td>
                          <div className="action-buttons compact">
                            <button 
                              className="btn-edit"
                              onClick={() => {
                                setShowPayslipHistory(false);
                                editSalaryRecord(record);
                              }}
                            >
                              Edit
                            </button>
                            {record.status === 'paid' && (
                              <button 
                                className="btn-download"
                                onClick={() => downloadPayslip(record.id)}
                              >
                                Download
                              </button>
                            )}
                            {record.status === 'draft' && (
                              <button 
                                className="btn-send"
                                onClick={() => sendPayslip(record.id)}
                              >
                                Send
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryManagement;