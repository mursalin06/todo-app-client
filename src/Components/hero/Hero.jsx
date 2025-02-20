import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import AuthContext from "../../Contexts/AuthContext";

const Hero = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="min-h-screen bg-lightBackground dark:bg-darkBackground flex flex-col">
            <nav>
                <Navbar></Navbar>
            </nav>
            <section className="flex flex-col items-center justify-center text-center px-4 py-20 flex-grow">
                <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-primary dark:text-primary">
                    Get Sh*t Done
                </h1>
                <p className="text-xl sm:text-2xl text-lightText dark:text-darkText max-w-2xl mb-8">
                    A minimal and elegant task management app designed to help you stay focused,
                    organized, and productive.
                </p>
                <Link
                    to={user ? "/tasks" : "/login"}
                    className="px-8 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Get Started
                </Link>
            </section>

            {/* Footer */}
            <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Get Sh*t Done. All rights reserved.
            </footer>
        </div>
    );
};

export default Hero;
