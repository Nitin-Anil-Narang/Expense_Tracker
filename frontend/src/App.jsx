import React from 'react'
import './App.css'
import SignUpForm from '../pages/SignUp/SignUpForm'
import {  Routes, Route } from "react-router-dom";
import LoginForm from '../pages/Login/Login';
import Home  from '../pages/Home/Home';
import { ROLES } from '../utils/Roles';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AssignRoles from '../pages/AssignRole/AssignRoles';

function App() {
  

  return (
    
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home/>} />
        
        <Route path="/assign-role" element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <AssignRoles />
          </ProtectedRoute>
        } />
      </Routes>
    
  )
}

export default App
