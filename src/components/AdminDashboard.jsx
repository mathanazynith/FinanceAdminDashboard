import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
//import { authService } from '../services/auth';
import Sidebar from './Sidebar';
import EmployeeManagement from './EmployeeManagement';
import ReportsBilling from './Reports';
import CustomerManagement from './CustomerManagement';
import CompanySettings from './CompanySettings';
import SalaryManagement from './SalaryManagement'; // Add this import
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Dashboard statistics
  const totalExpenses = 125000;
  const monthlySalary = 180000;
  const totalIncome = 320000;
  const profit = totalIncome - totalExpenses;

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="content-area">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Employees</h3>
                  <span className="stat-number">45</span>
                  <span className="stat-change positive">+2 from last month</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h3>Total Expenses</h3>
                  <span className="stat-number">${totalExpenses.toLocaleString()}</span>
                  <span className="stat-change negative">-5% from last month</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💵</div>
                <div className="stat-content">
                  <h3>Monthly Salary</h3>
                  <span className="stat-number">${monthlySalary.toLocaleString()}</span>
                  <span className="stat-change positive">+3% from last month</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h3>Total Income</h3>
                  <span className="stat-number">${totalIncome.toLocaleString()}</span>
                  <span className="stat-change positive">+12% from last month</span>
                </div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3>Recent Salary Payments</h3>
                <div className="recent-payments">
                  <div className="payment-row">
                    <span className="payment-label">John Doe</span>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                      <span className="payment-value amount">$8,500</span>
                      <span className="payment-status completed">Completed</span>
                    </div>
                  </div>
                  <div className="payment-row">
                    <span className="payment-label">Jane Smith</span>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                      <span className="payment-value amount">$7,200</span>
                      <span className="payment-status completed">Completed</span>
                    </div>
                  </div>
                  <div className="payment-row">
                    <span className="payment-label">Mike Johnson</span>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                      <span className="payment-value amount">$6,500</span>
                      <span className="payment-status completed">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="chart-card">
                <h3>Income vs Expenses</h3>
                <div className="income-expenses">
                  <div className="metric">
                    <span className="metric-label">Income:</span>
                    <span className="metric-value income">${totalIncome.toLocaleString()}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Expenses:</span>
                    <span className="metric-value expense">${totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Profit:</span>
                    <span className="metric-value profit">${profit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'employees':
        return <EmployeeManagement />;

      case 'salary': // Add this case for Salary Management
        return <SalaryManagement />;

      case 'reports':
        return <ReportsBilling />;

      case 'customers':
        return <CustomerManagement />;

      case 'settings':
        return <CompanySettings />;

      default:
        return (
          <div className="content-area">
            <h2>Welcome to Admin Dashboard</h2>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Fixed Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{getSectionTitle(activeSection)}</h1>
          </div>
          <div className="header-right">
            <div className="admin-user">
              <span className="user-avatar">A</span>
              <span className="user-name">Admin</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* Render Content Based on Active Section */}
        {renderContent()}
      </div>
    </div>
  );
};

// Helper function to get section title
const getSectionTitle = (sectionId) => {
  const sections = {
    dashboard: 'Dashboard',
    employees: 'Employee Management',
    customers: 'Customer Management',
    salary: 'Salary Management', // Add this
    transactions: 'In/Out Transactions',
    reports: 'Reports & Billing',
    settings: 'Settings'
  };
  return sections[sectionId] || 'Dashboard';
};

export default AdminDashboard;