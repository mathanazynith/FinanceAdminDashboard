// import React, { useState } from 'react';
// import './AdminLogin';

// const FinancePortal = () => {
//   const [activeNav, setActiveNav] = useState('Dashboard');

//   const navItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'salary', label: 'Salary Mgmt', icon: '💰' },
//     { id: 'cashflow', label: 'Cash Flow', icon: '📈' },
//     { id: 'banking', label: 'Banking', icon: '🏦' },
//     { id: 'expenses', label: 'Expenses', icon: '💸' },
//     { id: 'invoices', label: 'Invoices', icon: '📋' },
//     { id: 'taxes', label: 'Taxes', icon: '🏛️' },
//     { id: 'reports', label: 'Reports', icon: '📊' },
//     { id: 'settings', label: 'Settings', icon: '⚙️' }
//   ];

//   const statsData = [
//     {
//       type: 'revenue',
//       title: 'REVENUE',
//       amount: '$320,000',
//       change: '+12%',
//       changeType: 'positive'
//     },
//     {
//       type: 'expenses',
//       title: 'EXPENSES',
//       amount: '$125,000',
//       change: '-5%',
//       changeType: 'negative'
//     },
//     {
//       type: 'profit',
//       title: 'PROFIT',
//       amount: '$195,000',
//       change: '+15%',
//       changeType: 'positive'
//     }
//   ];

//   const upcomingPayments = [
//     { name: 'John Doe', amount: '$8,500', due: 'Due 15th' },
//     { name: 'Jane Smith', amount: '$7,200', due: 'Due 15th' },
//     { name: 'Mike Johnson', amount: '$6,500', due: 'Due 15th' }
//   ];

//   const quickActions = [
//     { icon: '➕', label: 'Add Payment' },
//     { icon: '📤', label: 'Export Data' },
//     { icon: '📄', label: 'Generate Report' },
//     { icon: '🔔', label: 'Set Reminder' }
//   ];

//   const handleNavClick = (navItem) => {
//     setActiveNav(navItem);
//   };

//   const handleLogout = () => {
//     console.log('Logging out...');
//     // Add logout logic here
//   };

//   return (
//     <div className="finance-portal">
//       {/* Sidebar */}
//       <div className="finance-sidebar">
//         <div className="portal-header">
//           <h1>ZYNITH IT SOLUTIONS</h1>
//           <p className="portal-subtitle">FINANCE PORTAL</p>
//         </div>
        
//         <nav className="finance-nav">
//           {navItems.map((item) => (
//             <button
//               key={item.id}
//               className={`finance-nav-item ${activeNav === item.label ? 'active' : ''}`}
//               onClick={() => handleNavClick(item.label)}
//             >
//               <span className="finance-nav-icon">{item.icon}</span>
//               <span>{item.label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>
      
//       {/* Main Content */}
//       <div className="finance-main">
//         <header className="finance-header">
//           <h2 className="finance-title">📊 FINANCE DASHBOARD</h2>
//           <div className="finance-user-area">
//             <div className="user-info">
//               <div className="user-avatar">JD</div>
//               <div className="user-details">
//                 <div className="user-name">John Doe</div>
//                 <div className="user-role">Finance Manager</div>
//               </div>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </header>
        
//         {/* Stats Grid */}
//         <div className="finance-stats-grid">
//           {statsData.map((stat, index) => (
//             <div key={index} className={`finance-stat-card ${stat.type}`}>
//               <div className="stat-title">{stat.title}</div>
//               <div className="stat-amount">{stat.amount}</div>
//               <div className={`stat-change ${stat.changeType}`}>
//                 {stat.changeType === 'positive' ? '↗' : '↘'} {stat.change}
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Dashboard Content */}
//         <div className="finance-dashboard">
//           <div className="finance-left-column">
//             {/* Charts Section */}
//             <div className="finance-card">
//               <h3 className="section-title">Financial Overview</h3>
//               <div className="chart-placeholder">
//                 Charts and graphs would be displayed here
//               </div>
//             </div>
//           </div>
          
//           <div className="finance-right-column">
//             {/* Upcoming Payments */}
//             <div className="finance-card">
//               <h3 className="section-title">UPCOMING SALARY PAYMENTS</h3>
//               <div className="payment-list">
//                 {upcomingPayments.map((payment, index) => (
//                   <div key={index} className="payment-item">
//                     <div className="payment-info">
//                       <div className="payment-name">{payment.name}</div>
//                       <div className="payment-due">⏳ {payment.due}</div>
//                     </div>
//                     <div className="payment-amount">{payment.amount}</div>
//                   </div>
//                 ))}
//                 <div className="payment-total">
//                   <div className="total-label">Total Due:</div>
//                   <div className="total-amount">$180,000</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Actions */}
//             <div className="finance-card">
//               <h3 className="section-title">Quick Actions</h3>
//               <div className="quick-actions">
//                 {quickActions.map((action, index) => (
//                   <button key={index} className="action-btn">
//                     <span className="action-icon">{action.icon}</span>
//                     <span className="action-label">{action.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinancePortal;





import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import './AdminDashboard.css';
import ReportsBilling from './Reports';
import CustomerManagement from './CustomerManagement';


const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeBillingTab, setActiveBillingTab] = useState('segments');
const [activeInvoiceType, setActiveInvoiceType] = useState('customer');
// Add these state variables to your AdminDashboard component
const [selectedMonth, setSelectedMonth] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [reportType, setReportType] = useState('');
const customerInvoices = [
  { id: 1, number: '5146846548', customer: 'Jane Cooper', date: '2/19/21', status: 'Paid', amount: '500.00' },
  { id: 2, number: '5467319467', customer: 'Wade Warren', date: '5/7/16', status: 'Paid', amount: '500.00' },
  { id: 3, number: '1345705945', customer: 'Esther Howard', date: '9/18/16', status: 'Unpaid', amount: '500.00' },
  { id: 4, number: '5440754979', customer: 'Cameron Williamson', date: '2/11/12', status: 'Paid', amount: '500.00' },
  { id: 5, number: '1243467984', customer: 'Brooklyn Simmons', date: '9/18/16', status: 'Unpaid', amount: '500.00' },
  { id: 6, number: '8454134649', customer: 'Leslie Alexander', date: '1/28/17', status: 'Unpaid', amount: '500.00' },
  { id: 7, number: '2130164040', customer: 'Jenny Wilson', date: '5/27/15', status: 'Paid', amount: '500.00' },
  { id: 8, number: '0439104645', customer: 'Guy Hawkins', date: '8/2/19', status: 'Paid', amount: '500.00' }
];

const vendorInvoices = [
  { id: 1, number: '6146846548', vendor: 'Tech Supplies Inc.', date: '3/15/21', status: 'Paid', amount: '1,200.00' },
  { id: 2, number: '6467319467', vendor: 'Office Solutions Ltd', date: '6/8/16', status: 'Paid', amount: '800.00' },
  { id: 3, number: '2345705945', vendor: 'Software Partners', date: '10/22/16', status: 'Unpaid', amount: '2,500.00' },
  { id: 4, number: '6440754979', vendor: 'Cloud Services Co', date: '3/5/12', status: 'Paid', amount: '1,500.00' }
];
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'employees', label: 'Employee Management', icon: '👥' },
  { id: 'customers', label: 'Customer Management', icon: '👥' }, // Add this line
  { id: 'salary', label: 'Salary Management', icon: '💰' },
  { id: 'transactions', label: 'In/Out Transactions', icon: '🔄' },
  { id: 'reports', label: 'Reports & Billing', icon: '📈' },
  { id: 'support', label: 'Help & Support', icon: '❓' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
];
  

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await authService.getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await authService.deleteEmployee(employeeId);
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Duplicate menuItems declaration removed to fix redeclaration error.

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Dashboard statistics
  const totalExpenses = 125000;
  const monthlySalary = 180000;
  const totalIncome = 320000;
  const profit = totalIncome - totalExpenses;

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="company-brand">
          <h2>Zynith IT Solutions</h2>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="weather-alert">
            <span className="alert-icon">☀️</span>
            <span>High UV</span>
            <span className="new-badge">New</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>{menuItems.find(item => item.id === activeSection)?.label}</h1>
            <p>Welcome back, Admin</p>
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

        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
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
              {/* <div className="chart-card">
                <h3>Monthly Salary Trend</h3>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {[50000, 75000, 100000, 125000, 150000, 180000].map((value, index) => (
                      <div key={index} className="chart-bar">
                        <div 
                          className="bar-fill" 
                          style={{ height: `${(value / 200000) * 100}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div> */}
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
    <div className="payment-row">
      <span className="payment-label">Sarah Wilson</span>
      <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
        <span className="payment-value amount">$9,200</span>
        <span className="payment-status completed">Completed</span>
      </div>
    </div>
    <div className="payment-row">
      <span className="payment-label">David Brown</span>
      <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
        <span className="payment-value amount">$5,800</span>
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
        )}

        {/* Employee Management Section */}
        {activeSection === 'employees' && (
          <div className="content-area">
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
                </select>
              </div>
            </div>

            {/* Header with Add Button */}
            <div className="section-header">
              <h3>Employees ({filteredEmployees.length})</h3>
              <button
                className="add-employee-btn"
                onClick={() => alert('Add Employee functionality would go here')}
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
                      <tr key={employee._id} className="employee-row">
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
                        <td>{employee.department}</td>
                        <td>{employee.phone}</td>
                        <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
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
          </div>
        )}

        {/* Reports & Billing Section */}
{activeSection === 'reports' && <ReportsBilling />}

        {/* Other Sections */}
        {activeSection !== 'dashboard' && activeSection !== 'employees' && (
          <div className="content-area">
            <h2>{menuItems.find(item => item.id === activeSection)?.label}</h2>
            
          </div>
        )}
        {activeSection === 'customers' && <CustomerManagement />}
        
      </div>
    </div>
  );
};

export default AdminDashboard;