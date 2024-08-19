import CreateTeacher from "../CreateTeacher"
import SideNav from "./sidenav"


const Teachers=()=>{
    return(
        <div className="flex">
<SideNav/>
<section>
  <h1 className="text-5xl my-8">Teachers</h1>
<CreateTeacher/>  
</section>

        </div>
    )
}
export default Teachers