import React, { useState } from "react";
import FormField from "../../../components/FormField";
import ModalField from "../../../components/Modal";
import { IoPersonAdd } from "react-icons/io5";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import useFetch from "../../../hooks/useFetch";
import SelectField from "../../../components/SelectField";
import { addUser } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
const CreateStudent = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const  dispatch= useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classroomName: ""  
  });

  // Fetch classrooms from the API
  const { data: classes = [] } = useFetch('http://localhost:3000/api/classes');

  // Map fetched classrooms to the format required by SelectField
  const classOptions = classes.map((classroom) => ({
    value: classroom._id,
    label: classroom.name
  }));

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSelectChange(value) {
    setFormData((prevData) => ({
      ...prevData,
      classroomName: value  // Match the key used in formData
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/users", formData);

      if (res.status === 201) {
        dispatch(addUser(res.data)); // Add the new user to the Redux store
        setLoading(false);
        toast({
          title: "Student Created Successfully",
          description: "Student has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: "", email: "", password: "", classroom: "" }); // Clear form after submission
      }
    } catch (e) {
      console.log('formdata', formData)
      setLoading(false);
      toast({
        title: "Error Creating Teacher",
        description: "An error occurred while creating the teacher.",
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
        title="Create Student"
        icon={<IoPersonAdd />}
        buttontext="Add Student"
        tooltiptext="Add Student"
        handleSubmit={handleSubmit}
        body={
          <>
            <FormField
              title="Name"
              name="name"
              value={formData.name}
              handleChange={handleChange}
            />
            <FormField
              title="Email"
              name="email"
              value={formData.email}
              handleChange={handleChange}
            />
            <FormField
              title="Password"
              name="password"
              value={formData.password}
              handleChange={handleChange}
            />
            <SelectField
              title="Select Classroom"
              options={classOptions}
              value={formData.classroomName}
              onChange={handleSelectChange}
            />
          </>
        }
        isLoading={isLoading} 
      />
    </div>
  );
};

export default CreateStudent;
