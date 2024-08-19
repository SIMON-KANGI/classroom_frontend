import React, { useState } from "react";
import FormField from "../components/FormField";
import ModalField from "../components/Modal";
import { IoPersonAdd } from "react-icons/io5";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useCreateClassroomMutation } from "../features/auth/authApi";
import { SiGoogleclassroom } from "react-icons/si";
const CreateClassroom = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [createClassroom]= useCreateClassroomMutation()
  const [formData, setFormData] = useState({
    name: "",
    schedule: [{ day: "", startTime: "", endTime: "" }],
  });

  const handleChange = (e, index, field) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index][field] = e.target.value;
    setFormData({ ...formData, schedule: newSchedule });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: "", startTime: "", endTime: "" }],
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
      const res = await axios.post('http://localhost:3000/api/classes', formData);

      if (res.status === 201) {
        setLoading(false);
        toast({
          title: "Classroom Created Successfully",
          description: "Classroom has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error creating Classroom",
        description: "An error occurred while creating the classroom.",
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
        title="Create Classroom"
        icon={<SiGoogleclassroom />}
        buttontext="Add Classroom"
        tooltiptext="Add Classroom"
        handleSubmit={handleSubmit}
        body={
          <>
            <FormField
              title="Classroom Name"
              name="name"
              value={formData.name}
              handleChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {formData.schedule.map((schedule, index) => (
              <div key={index}>
                <FormField
                  title="Day"
                  value={schedule.day}
                  handleChange={(e) => handleChange(e, index, "day")}
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

export default CreateClassroom;
