import Dashboard from "./dashboard/dashboard"
import SideNav from "./dashboard/sidenav"
import { selectCurrentUser } from "../features/auth/AuthSlice"
import { useSelector } from "react-redux"
const Home=()=>{
    const user = useSelector(selectCurrentUser)
    return(
        <div className="flex">
           
            <SideNav/>
          
           <Dashboard/>
           
        </div>
    )
}
export default Home