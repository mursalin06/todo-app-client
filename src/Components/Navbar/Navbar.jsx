import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import AuthContext from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  // console.log(user)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Define navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  // Function to determine classes for active/inactive nav links
  const linkClasses = ({ isActive }) =>
    `cursor-pointer text-lightText dark:text-darkText hover:text-primary transition-colors duration-200 border-b-2 ${isActive ? 'border-primary' : 'border-transparent'
    }`;

    const handleLogOut = () => {
      logOut()
      .then(() => {
          Swal.fire({
              title: "Congrats!",
              text: "Logged out successfully!",
              icon: "success"
          });
      })
      .catch((err) => {
          // console.log(err);
          Swal.fire({
              title: "Ohh Crap!",
              text: "Failed to Log Out",
              icon: "error"
          });
      })
    }

  return (
    <div className="navbar bg-base-300 dark:bg-darkBackground px-6 py-2">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-darkCardBackground rounded-box mt-3 w-52 p-2 shadow text-lightText dark:text-darkText"
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
        <NavLink
          to="/"
          className="text-xl text-primary "
        >
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
      <div className="navbar-end">
        <div className='flex items-center space-x-5'>
        <button onClick={toggleDarkMode} className="">
          {isDarkMode ? (
            <FaSun className="text-2xl text-yellow-400" />
          ) : (
            <FaMoon className="text-2xl text-gray-700" />
          )}
        </button>
        {
          !user ? <div className=''>
            <Link to="/login">
              <button className='btn bg-primary text-white'>Login</button>
            </Link>
          </div>: <div className=''>
            <p>
              <button onClick={handleLogOut} className='btn btn-sm bg-red-500 text-white'>Log Out</button>
            </p>
            <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 h-12 md:w-14 md:h-14 rounded-full ring ring-offset-2">
              <img className='w-full h-full'  src={user?.photoURL} />
            </div>
          </div>
          </div>
        }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
