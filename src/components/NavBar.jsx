import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const getUsernameFromToken = () => {
    if (!token) {
      console.error("No token found");
      return null;
    }
    try {
      const base64Url = token.split(".")[1]; // Extract the payload
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));
      return decodedPayload.sub;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  return (
    <div className="h-16 bg-custom-gradient  z-50 flex items-center sticky top-0 ">
      <div className="p-5 px-4 flex justify-between items-center">
        <div
          onClick={() => {
            if (navbarOpen) setNavbarOpen(!navbarOpen);
            navigate("/");
          }}
          className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
        >
          {getUsernameFromToken()?.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="md:px-2 px-3 w-full flex justify-between">
        <Link
          onClick={() => {
            if (navbarOpen) setNavbarOpen(!navbarOpen);
          }}
          to="/"
        >
          <h1 className="sm:pt-1 font-bold text-3xl text-white italic sm:mt-0 mt-2">
            Linklytics
          </h1>
        </Link>
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none  bg-custom-gradient sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <li className="hover:text-btnColor font-[500]  transition-all duration-150">
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className={`${
                path === "/" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="hover:text-btnColor font-[500]  transition-all duration-150">
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className={`${
                path === "/about" ? "text-white font-semibold" : "text-gray-200"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          {token && (
            <li className="hover:text-btnColor font-[500]  transition-all duration-150">
              <Link
                onClick={() => setNavbarOpen(!navbarOpen)}
                className={`${
                  path === "/dashboard"
                    ? "text-white font-semibold"
                    : "text-gray-200"
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}
          {!token && (
            <Link to="/register">
              <li className=" sm:ml-0 -ml-1 bg-rose-700 text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150">
                SignUp
              </li>
            </Link>
          )}

          {token && (
            <button
              onClick={onLogOutHandler}
              className="lg:mr-3 sm:ml-0 -ml-1 bg-rose-700 text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150"
            >
              LogOut
            </button>
          )}
        </ul>
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
