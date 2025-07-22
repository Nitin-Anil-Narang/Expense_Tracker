import React from 'react'
import './App.css'
import SignUpForm from '../pages/SignUp/SignUpForm'
import { Routes, Route } from "react-router-dom";
import LoginForm from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import { ROLES } from '../utils/Roles';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AssignRoles from '../pages/AssignRole/AssignRoles';
import ExpenseForm from '../pages/Expense/ExpenseForm';
import AdminExpenses from '../pages/adminExpense/AdminExpense';
import AduitLog from '../pages/AuditLog/AduitLog';
import ExpenseCharts from '../pages/Insights/ExpenseCharts';
import ReportCSV from '../pages/CSV/ReportCSV';

function App() {


  return (

    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/home" element={<Home />} />

      <Route path="/assign-role" element={
        <ProtectedRoute roles={[ROLES.ADMIN]}>
          <AssignRoles />
        </ProtectedRoute>
      } />

      <Route path="/expense" element={
        <ProtectedRoute roles={Object.values(ROLES)}>
          <ExpenseForm />
        </ProtectedRoute>
      } />

      <Route path="/expense-admin" element={
        <ProtectedRoute roles={[ROLES.ADMIN]}>
          <AdminExpenses />
        </ProtectedRoute>
      } />


      <Route path="/audit-logs" element={
        <ProtectedRoute roles={[ROLES.ADMIN]}>
          <AduitLog />
        </ProtectedRoute>
      } />



      <Route path="/insights" element={
        <ProtectedRoute roles={[ROLES.ADMIN]}>
          <ExpenseCharts />
        </ProtectedRoute>
      } />


      <Route path="/csv-export" element={
        <ProtectedRoute roles={[ROLES.ADMIN]}>
          <ReportCSV />
        </ProtectedRoute>
      } />


    </Routes>



  )
}

export default App
