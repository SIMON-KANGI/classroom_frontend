import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import SideNav from "./sidenav"
import useFetch from "../../hooks/useFetch"
import { selectCurrentUser } from "../../features/auth/AuthSlice"
import { useSelector } from "react-redux"
const Dashboard=()=>{
    const {data:users} = useFetch('http://localhost:3000/api/users/')
    const user= useSelector(selectCurrentUser)
    const {data:classes} = useFetch('http://localhost:3000/api/classes')
    const filterStudents= users.filter(user=>user.role ==='Student')
    const filterTeachers= users.filter(user=>user.role ==='Teacher')
    return(
        <div className="container">
            <h1 className="text-center text-3xl my-4">Hello {user?.name}</h1>
            <section className="flex flex-wrap justify-around">
                <Card className="m-4">
                    <CardBody className="flex flex-col bg-stone-200">
                    <h1 className="text-2xl">  Number of Students</h1>
                    <h1 className="text-5xl my-8 text-center">{filterStudents.length}</h1>
                    <p className="text-emerald-400">+ 30 from last month</p>
                    </CardBody>
                </Card>
                <Card className="m-4">
                    <CardBody className="flex flex-col px-8 bg-stone-200">
                    <h1 className="text-2xl">  Number of Teachers</h1>
                    <h1 className="text-5xl my-8 text-center">{filterTeachers.length}</h1>
                    <p className="text-rose-600">-3 from last month</p>
                    </CardBody>
                </Card>
                <Card className="m-4">
                    <CardBody className="flex flex-col bg-stone-200">
                    <h1 className="text-2xl">  Number of Classroom</h1>
                    <h1 className="text-5xl my-8 text-center">{classes.length}</h1>
                    <p className="text-emerald-400">+ 4 from last month</p>
                    </CardBody>
                </Card>
                <Card className="m-4">
                    <CardBody className="flex flex-col bg-stone-200">
                    <h1 className="text-2xl">Quick Links</h1>
                    
                    </CardBody>
                </Card>
            </section>
        </div>
    )
}
export default Dashboard