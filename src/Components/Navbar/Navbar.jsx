import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import AuthContext from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tasks', path: user ? '/tasks' : '/login' },
  ];

  const linkClasses = ({ isActive }) =>
    `cursor-pointer text-lightText dark:text-darkText hover:text-primary transition-colors duration-200 border-b-2 ${
      isActive ? 'border-primary' : 'border-transparent'
    }`;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          text: "You have successfully logged out!",
          icon: "success"
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Failed to log out",
          icon: "error"
        });
      });
  };

  return (
    <div className="navbar bg-base-300 dark:bg-darkBackground px-2 md:px-6 py-2">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost text-primary lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-darkCardBackground rounded-box mt-3 w-32 p-2 shadow text-lightText dark:text-darkText"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path} className={linkClasses}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Logo / Site Title */}
        <NavLink to="/" className="text-lg md:text-xl text-primary">
          Get Sh*t Done
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink to={link.path} className={linkClasses}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-5">
        <button onClick={toggleDarkMode} className="transition">
          {isDarkMode ? (
            <FaSun className="text-2xl text-yellow-400" />
          ) : (
            <FaMoon className="text-2xl text-gray-700" />
          )}
        </button>

        {!user ? (
          <Link to="/login">
            <button className="btn bg-primary text-white">Login</button>
          </Link>
        ) : (
          <>
            <button onClick={handleLogOut} className="btn btn-sm bg-red-500 text-white">Log Out</button>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-12 h-12 rounded-full ring ring-offset-2">
                <img className="w-full h-full" src={user?.photoURL} alt="User Avatar" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
