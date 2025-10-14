import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employee Management', icon: '👥' },
    { id: 'customers', label: 'Customer Management', icon: '👨‍💼' },
    { id: 'salary', label: 'Salary Management', icon: '💰' },
    { id: 'transactions', label: 'In/Out Transactions', icon: '🔄' },
    { id: 'reports', label: 'Reports & Billing', icon: '📈' },
    { id: 'support', label: 'Help & Support', icon: '❓' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
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
            {item.id === 'employees' && <span className="completed-badge">✓</span>}
            {item.id === 'settings' && <span className="new-badge">New</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="weather-alert">
          <span className="alert-icon">☀️</span>
          <span>High UV</span>
          <span className="new-badge">New</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <span className="logout-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;