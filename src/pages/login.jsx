import { Form, Formik, Field } from 'formik';
import React, { useState } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate=useNavigate();

    async function handleSubmit(values, { setSubmitting }) {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/login', {
                email: values.email,
                password: values.password,
            });

            if (res.status === 200) {
                const { token, user } = res.data;
                navigate('/')
                toast({
                    title: `Welcome back ${user?.name}`,
                    position: "top-center",
                    status: "info",
                    isClosable: true,
                });
                console.log(user.name)
            }
        } catch (error) {
            console.error(error);
            toast({
                title: `Error logging in`,
                position: "top-center",
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <div>
            <h1 className='text-center text-2xl'>Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form className="block text-stone-900 p-20 border rounded-md border-slate-500">
                        <h1 className='text-center text-3xl font-bold'>Login to Classroom</h1>
                        <div className="block w-1/2 mx-auto mt-6 relative p-4">
                            <label htmlFor="email" className="absolute -top-2">Email:</label>
                            <input
                                className="w-96 p-2 text-black rounded-md border-gray-700 border"
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="block w-1/2 mx-auto mt-6 relative p-4">
                            <label className="absolute -top-2" htmlFor="password">Password:</label>
                            <input
                                className="w-96 p-2 text-black rounded-md border-gray-700 border"
                                type="password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="block w-1/2 mx-auto mt-4 relative p-4">
                            <button
                                className="bg-emerald-600 py-3 w-96 text-center text-white rounded-md"
                                type="submit"
                                disabled={isSubmitting || isLoading}
                            >
                                {isLoading ? <Spinner size='sm' speed="0.85s" /> : 'Login'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
