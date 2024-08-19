import React, { useState } from "react";
import FormField from "../../components/FormField";
import ModalField from "../../components/Modal";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { SiGoogleclassroom } from "react-icons/si";
import SelectField from "../../components/SelectField";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/AuthSlice";

const CreateTimeTable = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const user = useSelector(selectCurrentUser);

  const [formData, setFormData] = useState({
    classroomName: "",
    schedule: [{ day: "", subject: "", startTime: "", endTime: "" }],
    teacher:user.id
  });

  const { data: classes = [] } = useFetch('http://localhost:3000/api/classes');

  // Filter classrooms based on the user's associated classrooms
  const userClassroomIds = user?.classrooms.map((classroom) => classroom._id);
  const filteredClassrooms = classes.filter((classroom) =>
    userClassroomIds?.includes(classroom._id)
  );

  // Map filtered classrooms to the format required by SelectField
  const classOptions = filteredClassrooms.map((classroom) => ({
    value: classroom._id,
    label: classroom.name,
  }));

  function handleSelectChange(value) {
    setFormData((prevData) => ({
      ...prevData,
      classroomName: value,
    }));
  }

  const handleChange = (e, index, field) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index][field] = e.target.value;
    setFormData({ ...formData, schedule: newSchedule });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: "", subject: "", startTime: "", endTime: "" }],
    });
  };

  const removeSchedule = (index) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({ ...formData, schedule: newSchedule });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/timetables', formData);

      if (res.status === 201) {
        setLoading(false);
        toast({
          title: "Timetable Created Successfully",
          description: "The timetable has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ classroomName: "", schedule: [{ day: "", subject: "", startTime: "", endTime: "" }] }); // Reset form
      }
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error creating Timetable",
        description: "An error occurred while creating the timetable.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(e);
    }
  }

  return (
    <div>
      <ModalField
        title="Create Timetable"
        icon={<SiGoogleclassroom />}
        buttontext="Add Timetable"
        tooltiptext="Add Timetable"
        handleSubmit={handleSubmit}
        body={
          <>
            <SelectField
              title="Select Classroom"
              options={classOptions}
              value={formData.classroomName}
              onChange={handleSelectChange}
            />
            {formData.schedule.map((schedule, index) => (
              <div key={index}>
                <FormField
                  title="Day"
                  value={schedule.day}
                  handleChange={(e) => handleChange(e, index, "day")}
                />
                <FormField
                  title="Subject"
                  value={schedule.subject}
                  handleChange={(e) => handleChange(e, index, "subject")}
                />
                <FormField
                  title="Start Time"
                  value={schedule.startTime}
                  handleChange={(e) => handleChange(e, index, "startTime")}
                />
                <FormField
                  title="End Time"
                  value={schedule.endTime}
                  handleChange={(e) => handleChange(e, index, "endTime")}
                />
                {formData.schedule.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="text-red-500 mt-2"
                  >
                    Remove Schedule
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSchedule}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Add Another Schedule
            </button>
          </>
        }
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateTimeTable;
