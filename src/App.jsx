import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/Home'
import Students from './pages/dashboard/Students'
import Teachers from './pages/dashboard/Teachers'
import Classroom from './pages/dashboard/Classroom'
function App() {
  return (
    <main className="flex h-fit overflow-hidden">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/classes" element={<Classroom/>}/>
      </Routes>
    </main>
  )
}

export default App
