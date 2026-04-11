import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/dashboard' // crea este archivo

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
