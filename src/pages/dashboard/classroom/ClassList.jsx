import { AiFillDelete } from "react-icons/ai";
import { Tooltip, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
const ClassList = ({ classes }) => {
    const toast = useToast();
    
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/classes/${id}`);
            if (res.status === 200) {
                toast({
                    title: 'Classroom deleted',
                    description: 'The classroom was successfully deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                // Optionally, refresh the list of classes
            }
        } catch (e) {
            console.error(e);
            toast({
                title: 'Error deleting classroom',
                description: 'An error occurred while deleting the classroom.',
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
                        <th className="py-3 px-4 text-left text-lg font-semibold">Days</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Start Time</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">End Time</th>
                        <th className="py-3 px-4 text-left text-lg font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classroom) => (
                        <React.Fragment key={classroom._id}>
                            <tr className="border-b-2 last:border-none hover:bg-gray-100">
                                <td rowSpan={classroom.schedule.length} className="py-3 px-4 text-md font-medium align-top">
                                    {classroom.name}
                                </td>
                                <td className="py-3 px-4 text-md">{classroom.schedule[0]?.day}</td>
                                <td className="py-3 px-4 text-md">{classroom.schedule[0]?.startTime}</td>
                                <td className="py-3 px-4 text-md">{classroom.schedule[0]?.endTime}</td>
                                <td rowSpan={classroom.schedule.length} className="py-3 px-4 text-md align-top">
                                <Tooltip label="delete" placement="top">
                                    <button onClick={() => handleDelete(classroom._id)}>
                                        <AiFillDelete size={20} color="#399918" />
                                    </button>
                                </Tooltip>
                                    
                                </td>
                            </tr>
                            {classroom.schedule.slice(1).map((sch) => (
                                <tr key={sch._id} className="border-b-2 last:border-none hover:bg-gray-100">
                                    <td className="py-3 px-4 text-md">{sch.day}</td>
                                    <td className="py-3 px-4 text-md">{sch.startTime}</td>
                                    <td className="py-3 px-4 text-md">{sch.endTime}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassList;
