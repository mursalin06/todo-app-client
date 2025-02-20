import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';
import Navbar from '../../Components/Navbar/Navbar';
import useAxios from '../../hooks/useAxios';

const Login = () => {
  const { login, googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPB = useAxios();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
        const userCredential = await login(values.email, values.password);
        const loggedInUser = userCredential.user;
        setUser({
            uid: loggedInUser?.uid,
            email: loggedInUser?.email,
            name: loggedInUser?.displayName || values.email.split('@')[0],
            photoURL: loggedInUser?.photoURL || '',
        });
        Swal.fire({
            title: "Great job!",
            text: "Login successful :)",
            icon: "success"
        });
        navigate('/');
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
        const loggedInUser = userCredential.user;
        const userData = {
            uid: loggedInUser?.uid,
            email: loggedInUser?.email,
            name: loggedInUser?.displayName,
            photoURL: loggedInUser?.photoURL,
        };
        setUser(userData); 
        axiosPB.post('/users', userData);
        Swal.fire({
            title: "Great job!",
            text: "Login successful :)",
            icon: "success"
        });
        navigate('/');
    } catch (error) {
        console.error('Error during Google sign-in:', error);
        Swal.fire({
            title: "Oh Crap!",
            text: "Login unsuccessful :(",
            icon: "error"
        });
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
          
            <FaGoogle></FaGoogle>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
