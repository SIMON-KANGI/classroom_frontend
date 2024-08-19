
import SideNav from "../sidenav";
import { useEffect } from "react";
import TeacherList from "./teacherList";
import { selectCurrentUsers } from "../../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/userSlice";
import CreateTeacher from "./CreateTeacher";
const Teachers = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectCurrentUsers);

    //call the function when the component mounts
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filterTeachers = users?.filter(user => user.role === 'Teacher');

    return (
        <div className="flex">
            <SideNav />
            <section> 
                <h1 className="text-5xl my-8">List of Teachers</h1>
                <CreateTeacher/>
                <TeacherList teachers={filterTeachers} />
            </section>
        </div>
    );
};

export default Teachers;
