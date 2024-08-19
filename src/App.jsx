import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/Home'
import Students from './pages/dashboard/students/Students'
import Teachers from './pages/dashboard/teachers/Teachers'
import Classroom from './pages/dashboard/classroom/Classroom'
import { selectCurentToken } from './features/auth/AuthSlice'
import { useSelector } from'react-redux'
import TimeTable from './pages/dashboard/timetable/timetable'
function App() {
  const token = useSelector(selectCurentToken)

  if (!token) {
    return <Login />
  }
  return (
    <main className=" main flex h-screen xl:overflow-auto overflow-hidden">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/classes" element={<Classroom/>}/>
        <Route path="/timetable" element={<TimeTable/>}/>
      </Routes>
    </main>
  )
}

export default App
