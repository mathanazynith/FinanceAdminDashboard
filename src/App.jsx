import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
//import ReportBilling from './components/ReportBilling'


function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/admin/login" 
          element={!user ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
        />
        <Route path="/" element={<Navigate to="/admin/login" />} />
      </Routes>
    </div>
  )
}

export default App