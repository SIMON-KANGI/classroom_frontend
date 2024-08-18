import { Card, CardBody, CardHeader } from "@chakra-ui/react"
import SideNav from "./sidenav"

const Dashboard=()=>{
    return(
        <div className="container">
            <h1 className="text-center text-5xl my-4">Dashboard</h1>
            <section className="flex justify-around">
                <Card>
                    <CardBody className="flex flex-col bg-stone-200">
                    <h1 className="text-2xl">  Number of Students</h1>
                    <h1 className="text-5xl my-8 text-center">500</h1>
                    <p className="text-emerald-400">+ 30 from last month</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="flex flex-col px-8 bg-stone-200">
                    <h1 className="text-2xl">  Number of Teachers</h1>
                    <h1 className="text-5xl my-8 text-center">30</h1>
                    <p className="text-rose-600">-3 from last month</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="flex flex-col bg-stone-200">
                    <h1 className="text-2xl">  Number of Classroom</h1>
                    <h1 className="text-5xl my-8 text-center">25</h1>
                    <p className="text-emerald-400">+ 4 from last month</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="flex flex-col bg-stone-200">
                    <h1 className="text-2xl">Quick Links</h1>
                    
                    </CardBody>
                </Card>
            </section>
        </div>
    )
}
export default Dashboard