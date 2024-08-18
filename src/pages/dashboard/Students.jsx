import CreateStudent from "../CreateStudent"
import SideNav from "./sidenav"


const Students=()=>{
    return(
        <div className="flex">
          
            <SideNav/> 
             <h1>List of Students</h1>
             <CreateStudent/>
        </div>
    )
}
export default Students