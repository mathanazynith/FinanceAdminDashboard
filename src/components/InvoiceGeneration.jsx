// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Reports.css';

// const InvoiceGeneration = () => {
//   const navigate = useNavigate();
  
//   const [selectedCustomer, setSelectedCustomer] = useState('');
//   const [selectedItem, setSelectedItem] = useState('');
//   const [itemQuantity, setItemQuantity] = useState(1);
//   const [invoiceItems, setInvoiceItems] = useState([]);
//   const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Math.floor(1000000000 + Math.random() * 9000000000));
//   const [dueDate, setDueDate] = useState('');
//   const [showItemsTable, setShowItemsTable] = useState(false);
//   const [notes, setNotes] = useState('');

//   const customers = [
//     { id: 1, name: 'Jane Cooper', email: 'jane@example.com', address: '123 Main St, New York, NY' },
//     { id: 2, name: 'Wade Warren', email: 'wade@example.com', address: '456 Oak Ave, Los Angeles, CA' },
//     { id: 3, name: 'Esther Howard', email: 'esther@example.com', address: '789 Pine Rd, Chicago, IL' },
//     { id: 4, name: 'Robert Fox', email: 'robert@example.com', address: '321 Elm St, Houston, TX' },
//     { id: 5, name: 'Jenny Wilson', email: 'jenny@example.com', address: '654 Maple Dr, Phoenix, AZ' },
//   ];

//   const items = [
//     { id: 1, name: 'Web Development', price: 500 },
//     { id: 2, name: 'UI/UX Design', price: 300 },
//     { id: 3, name: 'Consulting', price: 150 },
//     { id: 4, name: 'Maintenance', price: 200 },
//     { id: 5, name: 'Hosting', price: 50 },
//   ];

//   const addItemToInvoice = () => {
//     if (selectedItem && itemQuantity > 0) {
//       const selectedItemData = items.find(item => item.id === parseInt(selectedItem));
//       const newItem = {
//         id: Date.now(),
//         name: selectedItemData.name,
//         quantity: itemQuantity,
//         price: selectedItemData.price,
//         total: selectedItemData.price * itemQuantity
//       };
//       setInvoiceItems([...invoiceItems, newItem]);
//       setSelectedItem('');
//       setItemQuantity(1);
//       setShowItemsTable(true);
//     }
//   };

//   const removeItemFromInvoice = (id) => {
//     setInvoiceItems(invoiceItems.filter(item => item.id !== id));
//     if (invoiceItems.length === 1) {
//       setShowItemsTable(false);
//     }
//   };

//   const updateItemField = (id, field, value) => {
//     setInvoiceItems(invoiceItems.map(item => {
//       if (item.id === id) {
//         const updatedItem = { ...item, [field]: value };
//         if (field === 'price' || field === 'quantity') {
//           updatedItem.total = updatedItem.price * updatedItem.quantity;
//         }
//         return updatedItem;
//       }
//       return item;
//     }));
//   };

//   const getInvoiceTotal = () => {
//     return invoiceItems.reduce((total, item) => total + item.total, 0);
//   };

//   const getSubtotal = () => {
//     return invoiceItems.reduce((total, item) => total + item.total, 0);
//   };

//   const getTaxAmount = () => {
//     return getSubtotal() * 0.1; // 10% tax
//   };

//   const getGrandTotal = () => {
//     return getSubtotal() + getTaxAmount();
//   };

//   const generateInvoice = () => {
//     if (selectedCustomer && invoiceItems.length > 0 && dueDate) {
//       const customer = customers.find(c => c.id === parseInt(selectedCustomer));
      
//       // Check if due date has passed
//       const today = new Date();
//       const due = new Date(dueDate);
      
//       const invoiceData = {
//         number: invoiceNumber,
//         customer: customer.name,
//         date: new Date().toLocaleDateString(),
//         dueDate: dueDate,
//         items: invoiceItems,
//         subtotal: getSubtotal(),
//         tax: getTaxAmount(),
//         total: getGrandTotal(),
//         notes: notes
//       };
      
//       if (due < today) {
//         alert(`Warning: Invoice ${invoiceNumber} for ${customer.name} is overdue! Due date: ${dueDate}`);
//       } else {
//         alert(`Invoice ${invoiceNumber} generated successfully for ${customer.name} with total: $${getGrandTotal().toFixed(2)}`);
//       }
      
//       // Reset form
//       setInvoiceItems([]);
//       setSelectedCustomer('');
//       setDueDate('');
//       setShowItemsTable(false);
//       setNotes('');
//       setInvoiceNumber('INV-' + Math.floor(1000000000 + Math.random() * 9000000000));
//     } else {
//       alert('Please select a customer, add at least one item, and set a due date');
//     }
//   };

//   const goBackToReports = () => {
//     navigate('/reports-billing');
//   };

//   return (
//     <div className="invoice-generation-container">
//       {/* Header */}
//       <div className="invoice-header">
//         <button className="back-button" onClick={goBackToReports}>
//           ← Back to Reports
//         </button>
//         <h1>Invoice Generation</h1>
//         <p>Create and manage customer invoices</p>
//       </div>

//       <div className="invoice-generation-content">
//         <div className="invoice-form-section">
//           {/* Customer and Basic Info */}
//           <div className="form-row">
//             <div className="form-field">
//               <label>Select Customer *</label>
//               <select 
//                 className="form-select" 
//                 value={selectedCustomer}
//                 onChange={(e) => setSelectedCustomer(e.target.value)}
//               >
//                 <option value="">Choose customer</option>
//                 {customers.map(customer => (
//                   <option key={customer.id} value={customer.id}>
//                     {customer.name} - {customer.email}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-field">
//               <label>Invoice Number</label>
//               <input 
//                 type="text" 
//                 className="form-input"
//                 value={invoiceNumber}
//                 readOnly
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-field">
//               <label>Issue Date</label>
//               <input 
//                 type="date" 
//                 className="form-input"
//                 value={new Date().toISOString().split('T')[0]}
//                 readOnly
//               />
//             </div>
            
//             <div className="form-field">
//               <label>Due Date *</label>
//               <input 
//                 type="date" 
//                 className="form-input"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//               />
//             </div>
//           </div>

//           {/* Items Section */}
//           <div className="items-section">
//             <h3>Invoice Items</h3>
            
//             <div className="item-selection-row">
//               <select 
//                 className="item-select"
//                 value={selectedItem}
//                 onChange={(e) => setSelectedItem(e.target.value)}
//               >
//                 <option value="">Select item</option>
//                 {items.map(item => (
//                   <option key={item.id} value={item.id}>
//                     {item.name} - ${item.price}
//                   </option>
//                 ))}
//               </select>
              
//               <input 
//                 type="number" 
//                 min="1"
//                 value={itemQuantity}
//                 onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
//                 className="quantity-input"
//                 placeholder="Qty"
//               />
              
//               <button className="add-item-btn" onClick={addItemToInvoice}>
//                 Add Item
//               </button>
//             </div>
            
//             {showItemsTable && (
//               <div className="invoice-items-table">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Item Name</th>
//                       <th>Quantity</th>
//                       <th>Price ($)</th>
//                       <th>Total ($)</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoiceItems.map(item => (
//                       <tr key={item.id}>
//                         <td>
//                           <input
//                             type="text"
//                             value={item.name}
//                             onChange={(e) => updateItemField(item.id, 'name', e.target.value)}
//                             className="table-input"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             min="1"
//                             value={item.quantity}
//                             onChange={(e) => updateItemField(item.id, 'quantity', parseInt(e.target.value) || 1)}
//                             className="table-input"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             min="0"
//                             step="0.01"
//                             value={item.price}
//                             onChange={(e) => updateItemField(item.id, 'price', parseFloat(e.target.value) || 0)}
//                             className="table-input"
//                           />
//                         </td>
//                         <td className="total-cell">
//                           ${item.total.toFixed(2)}
//                         </td>
//                         <td>
//                           <button 
//                             className="remove-btn"
//                             onClick={() => removeItemFromInvoice(item.id)}
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Totals Section */}
//             {showItemsTable && (
//               <div className="totals-section">
//                 <div className="total-row">
//                   <span>Subtotal:</span>
//                   <span>${getSubtotal().toFixed(2)}</span>
//                 </div>
//                 <div className="total-row">
//                   <span>Tax (10%):</span>
//                   <span>${getTaxAmount().toFixed(2)}</span>
//                 </div>
//                 <div className="total-row grand-total">
//                   <span>Grand Total:</span>
//                   <span>${getGrandTotal().toFixed(2)}</span>
//                 </div>
//               </div>
//             )}

//             {/* Notes Section */}
//             <div className="form-field">
//               <label>Notes (Optional)</label>
//               <textarea 
//                 className="notes-textarea"
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Add any additional notes or terms..."
//                 rows="3"
//               />
//             </div>
//           </div>
          
//           <button className="generate-invoice-btn" onClick={generateInvoice}>
//             Generate Invoice
//           </button>
//         </div>

//         {/* Preview Section */}
//         <div className="invoice-preview-section">
//           <div className="preview-card">
//             <h3>Invoice Preview</h3>
//             <div className="preview-content">
//               {selectedCustomer || invoiceItems.length > 0 ? (
//                 <>
//                   <div className="preview-header">
//                     <div className="preview-invoice-number">Invoice: {invoiceNumber}</div>
//                     <div className="preview-date">Date: {new Date().toLocaleDateString()}</div>
//                   </div>
                  
//                   {selectedCustomer && (
//                     <div className="preview-customer">
//                       <strong>Bill To:</strong>
//                       <div className="customer-details">
//                         {customers.find(c => c.id === parseInt(selectedCustomer))?.name}<br />
//                         {customers.find(c => c.id === parseInt(selectedCustomer))?.email}<br />
//                         {customers.find(c => c.id === parseInt(selectedCustomer))?.address}
//                       </div>
//                     </div>
//                   )}
                  
//                   {invoiceItems.length > 0 && (
//                     <div className="preview-items">
//                       <table>
//                         <thead>
//                           <tr>
//                             <th>Item</th>
//                             <th>Qty</th>
//                             <th>Price</th>
//                             <th>Total</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {invoiceItems.map(item => (
//                             <tr key={item.id}>
//                               <td>{item.name}</td>
//                               <td>{item.quantity}</td>
//                               <td>${item.price.toFixed(2)}</td>
//                               <td>${item.total.toFixed(2)}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
                  
//                   {invoiceItems.length > 0 && (
//                     <div className="preview-totals">
//                       <div className="preview-total-row">
//                         <span>Subtotal:</span>
//                         <span>${getSubtotal().toFixed(2)}</span>
//                       </div>
//                       <div className="preview-total-row">
//                         <span>Tax:</span>
//                         <span>${getTaxAmount().toFixed(2)}</span>
//                       </div>
//                       <div className="preview-total-row grand">
//                         <span>Total:</span>
//                         <span>${getGrandTotal().toFixed(2)}</span>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="preview-placeholder">
//                   <p>Select a customer and add items to see preview</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceGeneration;