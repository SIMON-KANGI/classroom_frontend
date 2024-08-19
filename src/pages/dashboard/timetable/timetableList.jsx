import { AiFillDelete } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const TimetableList = ({ userTimetables }) => {
    const toast = useToast();
    
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/timetables/${id}`);
            if (res.status === 200) {
                toast({
                    title: 'Timetable deleted',
                    description: 'The timetable was successfully deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
               
            }
        } catch (e) {
            console.error(e);
            toast({
                title: 'Error deleting timetable',
                description: 'An error occurred while deleting the timetable.',
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
                        <th className="py-3 px-4 text-left text-lg font-semibold">Day</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Subject</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Start Time</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">End Time</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userTimetables.map((timetable) => (
                        timetable.schedule.map((sch, index) => (
                            <tr key={`${timetable._id}-${index}`} className="border-b last:border-none hover:bg-gray-100">
                                <td className="py-3 px-4 text-md">{sch.day}</td>
                                <td className="py-3 px-4 text-md">{sch.subject}</td>
                                <td className="py-3 px-4 text-md">{sch.startTime}</td>
                                <td className="py-3 px-4 text-md">{sch.endTime}</td>
                                {index === 0 && (
                                    <td rowSpan={timetable.schedule.length} className="py-3 px-4 text-md align-top">
                                        <button onClick={() => handleDelete(timetable._id)}>
                                            <AiFillDelete size={20} color="#ff3f3f" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimetableList;
