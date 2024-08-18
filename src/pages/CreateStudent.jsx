import React, { useState } from "react";
import FormField from "../components/FormField";
import ModalField from "../components/Modal";
import { IoPersonAdd } from "react-icons/io5";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const CreateStudent = () => {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    teacher:""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/users", formData);

      if (res.status === 201) {
        setLoading(false);
        toast({
          title: "Student Created Successfully",
          description: "Student has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e) {
      setLoading(false);
      toast({
        title: "Error creating Student",
        description: "An error occurred while creating the student.",
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
        buttontext="Add student"
        tooltiptext="Add student"
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
            
          </>
        }
        isLoading={isLoading} // Pass isLoading if you want to disable button during loading
      />
    </div>
  );
};

export default CreateStudent;
