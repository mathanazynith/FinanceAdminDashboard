import React from 'react';
import './Reports.css';

const ReportsBilling = () => {
  // Sample data
  const customerInvoices = [
    { id: 1, number: '5146846548', customer: 'Jane Cooper', date: '2/19/21', status: 'Paid', amount: '500.00' },
    { id: 2, number: '5467319467', customer: 'Wade Warren', date: '5/7/16', status: 'Paid', amount: '500.00' },
    { id: 3, number: '1345705945', customer: 'Esther Howard', date: '9/18/16', status: 'Unpaid', amount: '500.00' },
  ];

  const vendorInvoices = [
    { id: 1, number: '6146846548', vendor: 'Tech Supplies Inc.', date: '3/15/21', status: 'Paid', amount: '1,200.00' },
    { id: 2, number: '6467319467', vendor: 'Office Solutions Ltd', date: '6/8/16', status: 'Paid', amount: '800.00' },
  ];

  return (
    <div className="reports-billing-container">
      {/* Header */}
      <div className="reports-header">
        <h1>Reports & Billing</h1>
        <p>Welcome back, Admin</p>
        <p className="subtitle">Generate and export financial reports</p>
      </div>

      {/* Compact Reports Grid */}
      <div className="compact-reports-grid">
        {/* Monthly Salary Reports */}
        <div className="compact-report-card">
          <div className="card-header">
            <h3>Monthly Salary Reports</h3>
            <p>Generate detailed salary reports for all employees</p>
          </div>
          
          <div className="compact-form">
            <div className="form-field">
              <label>Select Month</label>
              <select className="compact-select">
                <option>Jan 2025</option>
                <option>Dec 2024</option>
                <option>Nov 2024</option>
              </select>
            </div>
            
            <div className="compact-export">
              <button className="compact-btn pdf">PDF</button>
              <button className="compact-btn excel">Excel</button>
            </div>
          </div>
        </div>

        {/* Expense Reports */}
        <div className="compact-report-card">
          <div className="card-header">
            <h3>Expense Reports</h3>
            <p>Track and analyze company expenses</p>
          </div>
          
          <div className="compact-form">
            <div className="form-field">
              <label>Date Range</label>
              <div className="date-compact">
                <input type="text" placeholder="dd-mm-yyyy" className="compact-date" />
                <span>to</span>
                <input type="text" placeholder="dd-mm-yyyy" className="compact-date" />
              </div>
            </div>
            
            <div className="compact-export">
              <button className="compact-btn pdf">PDF</button>
              <button className="compact-btn excel">Excel</button>
            </div>
          </div>
        </div>

        {/* Custom Reports */}
        <div className="compact-report-card">
          <div className="card-header">
            <h3>Custom Reports</h3>
            <p>Create custom financial reports</p>
          </div>
          
          <div className="compact-form">
            <div className="form-field">
              <label>Report Type</label>
              <select className="compact-select">
                <option>Department Salary</option>
                <option>Employee Performance</option>
                <option>Tax Summary</option>
              </select>
            </div>
            
            <button className="compact-generate">Generate Report</button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="compact-report-card">
          <div className="card-header">
            <h3>Recent Reports</h3>
            <p>Latest generated reports</p>
          </div>
          
          <div className="recent-list">
            <div className="recent-item">
              <span className="file-icon">📄</span>
              <div className="file-info">
                <strong>Jan 2025 Salary</strong>
                <span>19 Jan • 2.3MB</span>
              </div>
              <button className="download-icon">↓</button>
            </div>
            
            <div className="recent-item">
              <span className="file-icon">📊</span>
              <div className="file-info">
                <strong>Q4 2024 Expense</strong>
                <span>15 Jan • 1.8MB</span>
              </div>
              <button className="download-icon">↓</button>
            </div>
            
            <div className="recent-item">
              <span className="file-icon">📄</span>
              <div className="file-info">
                <strong>Dec 2024 Payroll</strong>
                <span>2 Jan • 3.1MB</span>
              </div>
              <button className="download-icon">↓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsBilling;