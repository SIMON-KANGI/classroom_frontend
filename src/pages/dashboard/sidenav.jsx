import { useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineAccessTimeFilled,MdAccountCircle  } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import LogOut from "../LogOut";
import { selectCurrentUser } from "../../features/auth/AuthSlice";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
const SideNav=()=>{
    const isAuthenticated=useAuth("Principal")
    const user= useSelector(selectCurrentUser)
    const [isSelected, setSelected] = useState(false)
    return(
        <div className="w-fit p-4 bg-slate-700 h-screen ">
    <div>
        <h1 className="text-2xl text-stone-100">Welcome {user?.role}</h1>

    </div>
    <div className=" border-b border-slate-400 items-center xl:my-2 my-8 w-100 py-4"> 
    <Link to="/" className={`flex flex-col items-center justify-evenly${isSelected?"bg-stone-100":"bg-transparent"}`}> 
<TfiDashboard size={'40'} color="white"/>
<h1 className="text-xl text-stone-200">Dashboard</h1>
</Link>
    </div>
    <div className=" border-b border-slate-400 items-center xl:my-2 my-8 w-100 py-4"> 
    <Link to="/students" className={`flex flex-col items-center justify-evenly${isSelected?"bg-stone-100":"bg-transparent"}`}> 
<PiStudentBold size={'40'} color="white"/>
<h1 className="text-xl text-stone-200">Students</h1>
</Link>

    </div>
    {isAuthenticated &&(<div className=" border-b border-slate-400 items-center xl:my-2 my-8 w-100 py-4"> 
    <Link to="/teachers" className="flex flex-col items-center justify-evenly"> 
<FaChalkboardTeacher size={'40'} color="white"/>
<h1 className="text-xl text-stone-200">Teachers</h1>
</Link>
    </div>)}
    
    <div className=" border-b border-slate-400 items-center xl:my-2 my-8 w-100 py-4"> 
    <Link to="/classes" className="flex flex-col items-center justify-evenly"> 
<SiGoogleclassroom size={'40'} color="white"/>
<h1 className="text-xl text-stone-200">Classrooms</h1>
</Link>
    </div>
    <div className=" border-b border-slate-400 items-center xl:my-2 my-8 w-100 py-4"> 
    <Link to="/timetable" className="flex flex-col items-center justify-evenly"> 
<MdOutlineAccessTimeFilled size={'40'} color="white"/>
<h1 className="text-xl text-stone-200">TimeTable</h1>
</Link>
    </div>
    <div className=" border-b border-slate-400 items-cente xl:my-2 my-8 w-100 py-4"> 
    <Link to="/timetable" className="flex flex-col items-center justify-evenly"> 
<MdAccountCircle size={'40'} color="white"/>
<h1 className="text-xl text-stone-200">Account</h1>
</Link>
    </div>
    <div className=" border-b border-slate-400 items-cente xl:my-2 my-8 w-100 py-4"> 
   <LogOut/>
    </div>
   
        </div>
    )
}

export default SideNav;