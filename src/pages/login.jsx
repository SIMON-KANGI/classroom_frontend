import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/AuthSlice';

function Login() {
    const [isLoading, setLoading] = useState(false);
    const [login, { error }] = useLoginMutation();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const from = location.state?.from?.pathname || '/'; 

    async function handleSubmit(values, { setSubmitting }) {
        try {
            setLoading(true);
            const res = await login({
                email: values.email,
                password: values.password,
            }).unwrap();

            if (res && res.token) {
                const { token, user } = res;
                dispatch(setCredentials({ token, user }));
                toast({
                    title: "Login successful",
                    description: `Welcome back, ${user?.name}`,
                    position: "top-center",
                    status: "success",
                    isClosable: true,
                });
                navigate(from, { replace: true });
            }
        } catch (err) {
            toast({
                title: "Error logging in",
                description: error?.data?.message || "Something went wrong",
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
        <div className='mx-auto w-1/2'>
           
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form className="block text-stone-900 p-20 border shadow-lg rounded-md border-slate-500">
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
                                placeholer="principal@classroom.com"
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
