import React, { useState } from 'react';
import './Reports.css';

const ReportsBilling = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Date.now());
  const [dueDate, setDueDate] = useState('');
  const [showItemsTable, setShowItemsTable] = useState(false);

  // Sample data
  const customers = [
    { id: 1, name: 'Jane Cooper', email: 'jane@example.com' },
    { id: 2, name: 'Wade Warren', email: 'wade@example.com' },
    { id: 3, name: 'Esther Howard', email: 'esther@example.com' },
  ];

  const recentInvoices = [
    { id: 1, number: '5146846548', customer: 'Jane Cooper', date: '2/19/21', status: 'Paid', amount: '500.00' },
    { id: 2, number: '5467319467', customer: 'Wade Warren', date: '5/7/16', status: 'Paid', amount: '500.00' },
    { id: 3, number: '1345705945', customer: 'Esther Howard', date: '9/18/16', status: 'Unpaid', amount: '500.00' },
  ];

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
        quantity: itemQuantity,
        price: 0, // User will manually enter
        total: 0
      };
      setInvoiceItems([...invoiceItems, newItem]);
      setSelectedItem('');
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

  const getInvoiceTotal = () => {
    return invoiceItems.reduce((total, item) => total + item.total, 0);
  };

  const generateInvoice = () => {
    if (selectedCustomer && invoiceItems.length > 0 && dueDate) {
      const customer = customers.find(c => c.id === parseInt(selectedCustomer));
      
      // Check if due date has passed
      const today = new Date();
      const due = new Date(dueDate);
      if (due < today) {
        alert(`Warning: Invoice ${invoiceNumber} for ${customer.name} is overdue! Due date: ${dueDate}`);
      } else {
        alert(`Invoice ${invoiceNumber} generated for ${customer.name} with total: $${getInvoiceTotal().toFixed(2)}`);
      }
      
      // Reset form
      setInvoiceItems([]);
      setSelectedCustomer('');
      setDueDate('');
      setShowItemsTable(false);
      setInvoiceNumber('INV-' + Date.now());
    } else {
      alert('Please select a customer, add at least one item, and set a due date');
    }
  };

  return (
    <div className="reports-billing-container">
      {/* Header */}
      <div className="reports-header">
        <h1>Reports & Billing</h1>
        <p>Welcome back, Admin</p>
        <p className="subtitle">Generate financial reports and create invoices</p>
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

          {/* Recent Invoices */}
          <div className="report-card recent-invoices-card">
            <div className="card-header">
              <h3>Recent Invoices</h3>
              <p>Latest generated invoices</p>
            </div>
            
            <div className="recent-invoices-table">
              <table>
                <thead>
                  <tr>
                    <th>Invoice Number</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td className="invoice-number">INV-{invoice.number}</td>
                      <td className="customer-info">
                        <div className="customer-name">{invoice.customer}</div>
                        <div className="customer-id">{invoice.date}</div>
                      </td>
                      <td>{invoice.date}</td>
                      <td>
                        <span className={`status-badge ${checkInvoiceStatus(invoice)}`}>
                          {checkInvoiceStatus(invoice) === 'overdue' ? 'Overdue' : invoice.status}
                        </span>
                      </td>
                      <td className="amount">${invoice.amount}</td>
                      <td>
                        <button className="action-btn download">↓</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Only Invoice Generation */}
        <div className="right-column">
          {/* Invoice Generation */}
          <div className="report-card invoice-generation-card">
            <div className="card-header">
              <h3>Invoice Generation</h3>
              <p>Create and manage customer invoices</p>
            </div>
            
            <div className="form-section">
              <div className="form-field">
                <label>Select Customer</label>
                <select 
                  className="form-select" 
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
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
                <label>Due Date</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              
              <div className="invoice-items-section">
                <label>Add Items</label>
                <div className="item-selection-row">
                  <input 
                    type="text"
                    className="item-input"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    placeholder="Enter item name"
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
                          <th>Quantity</th>
                          <th>Price ($)</th>
                          <th>Total ($)</th>
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
                              ${item.total.toFixed(2)}
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
                          <td colSpan="3" className="total-label"><strong>Grand Total:</strong></td>
                          <td colSpan="2" className="total-amount">
                            <strong>${getInvoiceTotal().toFixed(2)}</strong>
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
  );
};

export default ReportsBilling;