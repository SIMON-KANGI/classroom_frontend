import CreateStudent from "../CreateStudent"
import SideNav from "./sidenav"


const Students=()=>{
    return(
        <div className="flex">
          
            <SideNav/> 
             
             <section> 
                <h1 className="text-5xl my-8">List of Students</h1>
             <CreateStudent/>
             </section>
            
        </div>
    )
}
export default Students