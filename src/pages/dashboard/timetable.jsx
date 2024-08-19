import React from 'react'
import SideNav from './sidenav'
import CreateTimeTable from './createTimetable'

function TimeTable() {
  return (
    <div className='flex'>
    <SideNav/>
    <section>
        <h1 className='text-5xl my-8 mx-4'>TimeTable</h1>
        <CreateTimeTable/>
    </section>
      
    </div>
  )
}

export default TimeTable
