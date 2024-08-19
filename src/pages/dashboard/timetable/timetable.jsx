import React,{useEffect} from 'react'
import SideNav from '../sidenav'
import CreateTimeTable from './createTimetable'
import TimetableList from './timetableList'
import { selectCurrentTimetable } from '../../../features/timetableSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/auth/AuthSlice'
import { fetchTimetables } from '../../../features/timetableSlice'
import { useDispatch } from 'react-redux'
function TimeTable() {
  const user= useSelector(selectCurrentUser)
  const dispatch=useDispatch()
  const timetables= useSelector(selectCurrentTimetable)

  useEffect(()=>{
    dispatch(fetchTimetables())
  },[dispatch])

  const filterTimeTables= timetables?.filter(timetable=>timetable.teacher ===user._id)
  console.log(filterTimeTables)
  return (
    <div className='flex'>
    <SideNav/>
    <section>
        <h1 className='text-5xl my-8 mx-4'>TimeTable</h1>
        <CreateTimeTable/>
        <TimetableList
          userTimetables={filterTimeTables}
        />
    </section>
      
    </div>
  )
}

export default TimeTable
