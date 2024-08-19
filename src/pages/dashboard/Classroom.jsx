import CreateClassroom from "../CreateClassroom"
import SideNav from "./sidenav"

import useFetch from "../../hooks/useFetch"
const Classroom=()=>{
const {data:classes}= useFetch('http://localhost:3000/api/classes/')
    return(
        <div className="flex">
<SideNav/>
<section>
<h1 className="text-5xl my-8">Classrooms</h1>
  <CreateClassroom/>  
 {}
 
</section>

        </div>
    )
}
export default Classroom