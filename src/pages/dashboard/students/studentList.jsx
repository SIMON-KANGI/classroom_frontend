import { AiFillDelete } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const StudentList = ({ students }) => {
    const toast = useToast();
    
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/users/${id}`);
            if (res.status === 200) {
                toast({
                    title: 'Student deleted',
                    description: 'The student was successfully deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
                students.filter(student=>student.id===id)
            
        } catch (e) {
            console.error(e);
            toast({
                title: 'Error deleting student',
                description: 'An error occurred while deleting the student.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="overflow-x-auto w-screen px-8">
            <table className="w-3/4 bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Name</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Email</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Classroom</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id} className="border-b last:border-none hover:bg-gray-100">
                            <td className="py-3 px-4 text-md">{student.name}</td>
                            <td className="py-3 px-4 text-md">{student.email}</td>
                            <td className="py-3 px-4 text-md">
                                {student.classrooms.map(classroom => classroom.name).join(", ")}
                            </td>
                            <td className="py-3 px-2 text-md">
                                <button onClick={() => handleDelete(student._id)}>
                                    <AiFillDelete size={20} color="#ff3f3f" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
