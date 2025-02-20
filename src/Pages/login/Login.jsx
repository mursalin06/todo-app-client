import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const { login, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    console.log('Logging in with:', values);
    try {
        Swal.fire({
            title: "Great job!",
            text: "Login successful :)",
            icon: "success"
          });
          navigate('/');
      const userCredential = await login(values.email, values.password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
        Swal.fire({
            title: "Oh No!",
            text: "Something went wrong :(",
            icon: "error"
          });
      console.error('Error during login:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await googleSignIn();
      console.log('User logged in with Google:', userCredential.user);
      // Optionally, redirect or update state as needed.
    } catch (error) {
      console.error('Error during Google sign in:', error);
      // Optionally, show error feedback to the user.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightBackground dark:bg-darkBackground transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-darkCardBackground rounded-xl shadow-lg transition-colors duration-300">
        <h2 className="text-center text-3xl font-bold text-lightText dark:text-darkText">
          Sign in to your account
        </h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
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
            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div>
                <Link to="/register" className="text-lightText dark:text-darkText">
                  Don't have an account? <u className="text-primary">Register</u>
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-colors duration-200"
          >
            {/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.35 11.1c0-.76-.07-1.49-.2-2.2H12v4.2h5.8c-.25 1.34-1 2.48-2.1 3.24v2.7h3.4c2-1.84 3.2-4.56 3.2-7.74z" />
              <path d="M12 22c2.7 0 4.98-.9 6.64-2.43l-3.4-2.7c-.94.63-2.15 1-3.24 1-2.48 0-4.58-1.67-5.32-3.91H3v2.45C4.66 20.92 8.05 22 12 22z" />
              <path d="M6.68 13.09c-.2-.6-.32-1.25-.32-1.91s.12-1.31.32-1.91V7.83H3V10c0 1.04.24 2.04.68 3.09l3-2z" />
              <path d="M12 4.5c1.47 0 2.8.5 3.83 1.48l2.87-2.87C16.98 2.23 14.63 1 12 1 8.05 1 4.66 2.08 3 4v2.45h3.68C7.42 5.17 9.52 4.5 12 4.5z" />
            </svg> */}
            <FaGoogle></FaGoogle>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
