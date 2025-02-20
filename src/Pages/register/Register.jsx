import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import Navbar from '../../Components/Navbar/Navbar';
import useAxios from '../../hooks/useAxios';

const Register = () => {
    const { createUser, setUser, updateUserProfile, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPB = useAxios();
// console.log("USER: ",user)
    const onSubmit = async (values, { setSubmitting }) => {
        // console.log("Form Values:", values);
        try {
            const userCredential = await createUser(values.email, values.password);
            await updateUserProfile(values.name, values.photoURL);
            setUser({
                uid: userCredential.user.uid,
                email: values.email,
                name: values.name,
                photoURL: values.photoURL,
            });
            Swal.fire({
                title: "Great job!",
                text: "Registration successful :)",
                icon: "success"
            });
            axiosPB.post("/users", user)
            navigate('/');
            // console.log("User created:", userCredential.user);
        } catch (error) {
            console.error("Error during registration:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <nav className='sticky top-0 z-50 border-b border-b-gray-700'>
                <Navbar></Navbar>
            </nav>
            <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-lightBackground dark:bg-darkBackground transition-colors duration-300">
                <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-darkCardBackground rounded-xl shadow-lg transition-colors duration-300">
                    <h2 className="text-center text-3xl font-bold text-lightText dark:text-darkText">
                        Create an Account
                    </h2>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', photoURL: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'Required';
                            } else if (values.password.length < 6) {
                                errors.password = 'Password must be at least 6 characters';
                            }
                            if (!values.photoURL) {
                                errors.photoURL = 'Required';
                            } else if (
                                !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(values.photoURL)
                            ) {
                                errors.photoURL = 'Invalid photo URL';
                            }
                            return errors;
                        }}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-lightText dark:text-darkText"
                                    >
                                        Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label
                                        htmlFor="photoURL"
                                        className="block text-sm font-medium text-lightText dark:text-darkText"
                                    >
                                        Photo URL
                                    </label>
                                    <Field
                                        type="url"
                                        name="photoURL"
                                        id="photoURL"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200"
                                    />
                                    <ErrorMessage name="photoURL" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-lightText dark:text-darkText"
                                    >
                                        Email Address
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-lightText dark:text-darkText"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-colors duration-200"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <Link to='/login' className='text-lightText dark:text-darkText'>
                                        Already have an account? <u className='text-primary'>Login</u>
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                                    >
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;
