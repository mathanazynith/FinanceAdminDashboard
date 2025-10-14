import React, { useState, useEffect } from 'react';
import './CompanySettings.css';

const CompanySettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    companyName: 'Zynith IT Solutions',
    address: '',
    phone: '',
    email: '',
    website: '',
    taxId: '',
    currency: 'USD',
    fiscalYear: 'January'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Load company info from localStorage on component mount
  useEffect(() => {
    const savedInfo = localStorage.getItem('companyInfo');
    if (savedInfo) {
      setCompanyInfo(JSON.parse(savedInfo));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!companyInfo.address.trim()) {
      newErrors.address = 'Company address is required';
    }
    
    if (companyInfo.email && !/\S+@\S+\.\S+/.test(companyInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (companyInfo.website && !/^https?:\/\/.+\..+/.test(companyInfo.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    setIsEditing(false);
    setSaveMessage('Company information saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleCancel = () => {
    const savedInfo = localStorage.getItem('companyInfo');
    if (savedInfo) {
      setCompanyInfo(JSON.parse(savedInfo));
    }
    setIsEditing(false);
    setErrors({});
    setSaveMessage('');
  };

  return (
    <div className="company-settings">
     
       
     
      {saveMessage && (
        <div className="save-message success">
          {saveMessage}
        </div>
      )}

      <div className="settings-layout">
        {/* Left Side - Form */}
        <div className="form-section">
          <div className="company-info-card">
            <div className="card-header">
              <h3>Company Details</h3>
              {!isEditing && (
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <span className="edit-icon">✏️</span>
                  Edit Information
                </button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={companyInfo.companyName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'disabled' : ''}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address" className="required">
                  Company Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={companyInfo.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`${!isEditing ? 'disabled' : ''} ${errors.address ? 'error' : ''}`}
                  rows="3"
                  placeholder="Enter full company address"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={companyInfo.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'disabled' : ''}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={companyInfo.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`${!isEditing ? 'disabled' : ''} ${errors.email ? 'error' : ''}`}
                  placeholder="contact@company.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={companyInfo.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`${!isEditing ? 'disabled' : ''} ${errors.website ? 'error' : ''}`}
                  placeholder="https://www.company.com"
                />
                {errors.website && <span className="error-message">{errors.website}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="taxId">Tax ID / VAT Number</label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={companyInfo.taxId}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'disabled' : ''}
                  placeholder="TAX-123456789"
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency">Default Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={companyInfo.currency}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'disabled' : ''}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="AUD">AUD (A$)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="fiscalYear">Fiscal Year Start</label>
                <select
                  id="fiscalYear"
                  name="fiscalYear"
                  value={companyInfo.fiscalYear}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={!isEditing ? 'disabled' : ''}
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="action-buttons">
                <button className="save-btn" onClick={handleSave}>
                  <span className="save-icon">💾</span>
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <span className="cancel-icon">❌</span>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="preview-section">
          <div className="preview-card">
            <div className="preview-header">
              <h3>Company Information Preview</h3>
              <div className="preview-badge">Live Preview</div>
            </div>
            <div className="preview-content">
              <div className="preview-item">
                <span className="preview-label">Company Name:</span>
                <span className="preview-value">{companyInfo.companyName}</span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Address:</span>
                <span className="preview-value">
                  {companyInfo.address || <span className="missing-info">Not provided</span>}
                </span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Phone:</span>
                <span className="preview-value">
                  {companyInfo.phone || <span className="missing-info">Not provided</span>}
                </span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Email:</span>
                <span className="preview-value">
                  {companyInfo.email || <span className="missing-info">Not provided</span>}
                </span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Website:</span>
                <span className="preview-value">
                  {companyInfo.website || <span className="missing-info">Not provided</span>}
                </span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Tax ID:</span>
                <span className="preview-value">
                  {companyInfo.taxId || <span className="missing-info">Not provided</span>}
                </span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Currency:</span>
                <span className="preview-value">{companyInfo.currency}</span>
              </div>
              
              <div className="preview-item">
                <span className="preview-label">Fiscal Year:</span>
                <span className="preview-value">Starts in {companyInfo.fiscalYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;