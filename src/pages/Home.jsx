import Dashboard from "./dashboard/dashboard"
import SideNav from "./dashboard/sidenav"

const Home=()=>{
    return(
        <div className="flex">
           
            <SideNav/>
            <h1>Hello Sudent</h1>
           <Dashboard/>
           
        </div>
    )
}
export default Home