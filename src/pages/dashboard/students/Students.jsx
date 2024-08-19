import CreateStudent from "./CreateStudent";
import SideNav from "../sidenav";
import { useEffect } from "react";
import StudentList from "./studentList";
import { selectCurrentUsers } from "../../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/userSlice";

const Students = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectCurrentUsers);

    //call the function when the component mounts
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filterStudents = users?.filter(user => user.role === 'Student');

    return (
        <div className="flex">
            <SideNav />
            <section> 
                <h1 className="text-5xl my-8">List of Students</h1>
                <CreateStudent />
                <StudentList students={filterStudents} />
            </section>
        </div>
    );
};

export default Students;
