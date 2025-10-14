import React, { useState } from 'react';
import './Reports.css';

const ReportsBilling = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Date.now());
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [showItemsTable, setShowItemsTable] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [transactionNumber, setTransactionNumber] = useState('');
  const [transactionProof, setTransactionProof] = useState(null);
  const [invoices, setInvoices] = useState([
    { id: 1, number: '5146846548', customer: 'Jane Cooper', date: '2/19/21', status: 'Paid', amount: '500.00' },
    { id: 2, number: '5467319467', customer: 'Wade Warren', date: '5/7/16', status: 'Paid', amount: '500.00' },
    { id: 3, number: '1345705945', customer: 'Esther Howard', date: '9/18/16', status: 'Unpaid', amount: '500.00' },
    { id: 4, number: '7894561230', customer: 'Robert Fox', date: '1/15/23', status: 'Unpaid', amount: '750.00' },
    { id: 5, number: '3216549870', customer: 'Darlene Robertson', date: '3/22/23', status: 'Paid', amount: '320.00' },
  ]);

  // Sample data
  const customers = [
    { id: 1, name: 'Jane Cooper', email: 'jane@example.com' },
    { id: 2, name: 'Wade Warren', email: 'wade@example.com' },
    { id: 3, name: 'Esther Howard', email: 'esther@example.com' },
  ];

  // Currency symbols
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    INR: '₹'
  };

  // Function to check invoice status (overdue check)
  const checkInvoiceStatus = (invoice) => {
    const today = new Date();
    const invoiceDate = new Date(invoice.date);
    const daysDiff = Math.floor((today - invoiceDate) / (1000 * 60 * 60 * 24));
    
    if (invoice.status === 'Paid') return 'paid';
    if (daysDiff > 30) return 'overdue';
    return 'unpaid';
  };

  const addItemToInvoice = () => {
    if (selectedItem && itemQuantity > 0) {
      const newItem = {
        id: Date.now(),
        name: selectedItem,
        description: itemDescription,
        quantity: itemQuantity,
        price: 0, // User will manually enter
        total: 0
      };
      setInvoiceItems([...invoiceItems, newItem]);
      setSelectedItem('');
      setItemDescription('');
      setItemQuantity(1);
      setShowItemsTable(true);
    }
  };

  const removeItemFromInvoice = (id) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    if (invoiceItems.length === 1) {
      setShowItemsTable(false);
    }
  };

  const updateItemField = (id, field, value) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'price' || field === 'quantity') {
          updatedItem.total = updatedItem.price * updatedItem.quantity;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const getSubtotal = () => {
    return invoiceItems.reduce((total, item) => total + item.total, 0);
  };

  const getTaxAmount = () => {
    return (getSubtotal() * taxRate) / 100;
  };

  const getInvoiceTotal = () => {
    return getSubtotal() + getTaxAmount();
  };

  const generateInvoice = () => {
    if (selectedCustomer && invoiceItems.length > 0 && invoiceDate && dueDate) {
      const customer = customers.find(c => c.id === parseInt(selectedCustomer));
      
      // Check if due date has passed
      const today = new Date();
      const due = new Date(dueDate);
      if (due < today) {
        alert(`Warning: Invoice ${invoiceNumber} for ${customer.name} is overdue! Due date: ${dueDate}`);
      } else {
        alert(`Invoice ${invoiceNumber} generated for ${customer.name} with total: ${currencySymbols[currency]}${getInvoiceTotal().toFixed(2)}`);
      }
      
      // Reset form and close modal
      setInvoiceItems([]);
      setSelectedCustomer('');
      setInvoiceDate('');
      setDueDate('');
      setTaxRate(0);
      setCurrency('USD');
      setShowItemsTable(false);
      setInvoiceNumber('INV-' + Date.now());
      setShowInvoiceModal(false);
    } else {
      alert('Please select a customer, add at least one item, and set invoice/due dates');
    }
  };

  const openInvoiceModal = () => {
    setShowInvoiceModal(true);
  };

  const closeInvoiceModal = () => {
    setShowInvoiceModal(false);
    // Reset form when closing modal
    setInvoiceItems([]);
    setSelectedCustomer('');
    setInvoiceDate('');
    setDueDate('');
    setTaxRate(0);
    setCurrency('USD');
    setShowItemsTable(false);
    setInvoiceNumber('INV-' + Date.now());
  };

  const openPaymentModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedInvoice(null);
    setTransactionNumber('');
    setTransactionProof(null);
  };

  const handlePaymentSubmit = () => {
    if (!transactionNumber || !transactionProof) {
      alert('Please fill in both transaction number and upload proof');
      return;
    }

    // Update invoice status to paid
    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice.id 
        ? { ...inv, status: 'Paid' }
        : inv
    ));

    alert(`Payment confirmed for invoice INV-${selectedInvoice.number}`);
    closePaymentModal();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTransactionProof(file);
    }
  };

  const deleteInvoice = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    }
  };

  return (
    <div className="reports-billing-container">
      {/* Header */}
      <div className="reports-header">
        
        
        
        {/* Invoice Generation Button */}
        <button className="generate-invoice-main-btn" onClick={openInvoiceModal}>
          Generate New Invoice
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Profit & Loss Report */}
          <div className="report-card">
            <div className="card-header">
              <h3>Profit & Loss Report</h3>
              <p>Comprehensive financial performance overview</p>
            </div>
            
            <div className="form-section">
              <div className="form-field">
                <label>Date Range</label>
                <div className="date-range">
                  <input type="text" placeholder="dd-mm-yyyy" className="date-input" />
                  <span>to</span>
                  <input type="text" placeholder="dd-mm-yyyy" className="date-input" />
                </div>
              </div>
              
              <div className="export-buttons">
                <button className="export-btn pdf">PDF</button>
                <button className="export-btn excel">Excel</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Invoice History */}
          <div className="report-card invoice-history-card">
            <div className="card-header">
              <h3>Invoice History</h3>
              <p>All generated invoices</p>
            </div>
            
            <div className="invoice-history-table">
              <table>
                <thead>
                  <tr>
                    <th>Invoice Number</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(invoice => {
                    const status = checkInvoiceStatus(invoice);
                    return (
                      <tr key={invoice.id}>
                        <td className="invoice-number">INV-{invoice.number}</td>
                        <td className="customer-info">
                          <div className="customer-name">{invoice.customer}</div>
                        </td>
                        <td>{invoice.date}</td>
                        <td>
                          <span className={`status-badge ${status}`}>
                            {status === 'overdue' ? 'Overdue' : invoice.status}
                          </span>
                        </td>
                        <td className="amount">${invoice.amount}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn download" title="Download">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                            </button>
                            {(status === 'unpaid' || status === 'overdue') && (
                              <button 
                                className="action-btn verify-payment"
                                onClick={() => openPaymentModal(invoice)}
                                title="Verify Payment"
                              >
                                Verify Payment
                              </button>
                            )}
                            <button 
                              className="action-btn delete"
                              onClick={() => deleteInvoice(invoice.id)}
                              title="Delete Invoice"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Generation Modal */}
      {showInvoiceModal && (
        <div className="modal-overlay" onClick={closeInvoiceModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Generate New Invoice</h2>
              <button className="close-modal-btn" onClick={closeInvoiceModal}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="report-card invoice-generation-card">
                <div className="card-header">
                  <h3>Invoice Details</h3>
                  <p>Create and manage customer invoices</p>
                </div>
                
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-field">
                      <label>Select Customer *</label>
                      <select 
                        className="form-select" 
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        required
                      >
                        <option value="">Choose customer</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-field">
                      <label>Invoice Number</label>
                      <input 
                        type="text"
                        className="form-input"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Invoice Date *</label>
                      <input 
                        type="date" 
                        className="form-input"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Due Date *</label>
                      <input 
                        type="date" 
                        className="form-input"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Tax Rate (%)</label>
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        className="form-input"
                        value={taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Currency</label>
                      <select 
                        className="form-select" 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="INR">Indian Rupee (₹)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="invoice-items-section">
                    <label>Add Items *</label>
                    <div className="item-selection-row">
                      <input 
                        type="text"
                        className="item-input"
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        placeholder="Item name"
                      />
                      <input 
                        type="text"
                        className="item-input"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        placeholder="Description"
                      />
                      <input 
                        type="number" 
                        min="1"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                        className="quantity-input"
                        placeholder="Qty"
                      />
                      <button className="add-item-btn" onClick={addItemToInvoice}>
                        Add Item
                      </button>
                    </div>
                    
                    {showItemsTable && (
                      <div className="invoice-items-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Item Name</th>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Price ({currencySymbols[currency]})</th>
                              <th>Total ({currencySymbols[currency]})</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoiceItems.map(item => (
                              <tr key={item.id}>
                                <td>
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateItemField(item.id, 'name', e.target.value)}
                                    className="table-input"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) => updateItemField(item.id, 'description', e.target.value)}
                                    className="table-input"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateItemField(item.id, 'quantity', parseInt(e.target.value) || 1)}
                                    className="table-input"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) => updateItemField(item.id, 'price', parseFloat(e.target.value) || 0)}
                                    className="table-input"
                                  />
                                </td>
                                <td className="total-cell">
                                  {currencySymbols[currency]}{item.total.toFixed(2)}
                                </td>
                                <td>
                                  <button 
                                    className="remove-btn"
                                    onClick={() => removeItemFromInvoice(item.id)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="4" className="total-label"><strong>Subtotal:</strong></td>
                              <td colSpan="2" className="total-amount">
                                <strong>{currencySymbols[currency]}{getSubtotal().toFixed(2)}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="total-label"><strong>Tax ({taxRate}%):</strong></td>
                              <td colSpan="2" className="total-amount">
                                <strong>{currencySymbols[currency]}{getTaxAmount().toFixed(2)}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="4" className="total-label"><strong>Grand Total:</strong></td>
                              <td colSpan="2" className="total-amount grand-total">
                                <strong>{currencySymbols[currency]}{getInvoiceTotal().toFixed(2)}</strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    )}
                  </div>
                  
                  <button className="generate-invoice-btn" onClick={generateInvoice}>
                    Generate Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={closePaymentModal}>
          <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className="report-card payment-details-card">
                <div className="card-header">
                  <h3>Payment Details</h3>
                </div>
                
                <div className="form-section">
                  <div className="invoice-summary">
                    <div className="summary-row">
                      <span>Customer:</span>
                      <span>{selectedInvoice?.customer}</span>
                    </div>
                    <div className="summary-row">
                      <span>Amount Due:</span>
                      <span className="amount-due">${selectedInvoice?.amount}</span>
                    </div>
                    <div className="summary-row">
                      <span>Due Date:</span>
                      <span>{selectedInvoice?.date}</span>
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <label>Transaction Number *</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={transactionNumber}
                      onChange={(e) => setTransactionNumber(e.target.value)}
                      placeholder="Enter transaction/reference number"
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label>Proof of Transaction *</label>
                    <div className="file-upload-container">
                      <input 
                        type="file"
                        id="transaction-proof"
                        className="file-input"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        required
                      />
                      <label htmlFor="transaction-proof" className="file-upload-label">
                        {transactionProof ? transactionProof.name : 'Choose file...'}
                      </label>
                      {transactionProof && (
                        <span className="file-size">
                          {(transactionProof.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      )}
                    </div>
                    <p className="file-hint">Supported formats: PDF, JPG, PNG, DOC (Max: 10MB)</p>
                  </div>
                  
                  <div className="payment-actions">
                    <button className="cancel-btn" onClick={closePaymentModal}>
                      Cancel
                    </button>
                    <button className="confirm-payment-btn" onClick={handlePaymentSubmit}>
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsBilling;