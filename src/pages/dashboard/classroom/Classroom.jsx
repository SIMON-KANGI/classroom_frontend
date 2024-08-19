import CreateClassroom from "./CreateClassroom"
import SideNav from "../sidenav"
import { selectCurrentClasses } from "../../../features/classRoomSlice"
import { fetchClasses } from "../../../features/classRoomSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import ClassList from "./ClassList"
const Classroom=()=>{
const disptach= useDispatch()
const classes=useSelector(selectCurrentClasses)
useEffect(()=>{
    disptach(fetchClasses())
},[disptach])
    return(
        <div className="flex">
<SideNav/>
<section>
<h1 className="text-5xl my-8">Classrooms</h1>
  <CreateClassroom/>
  <ClassList classes={classes}/> 
 
 
</section>

        </div>
    )
}
export default Classroom