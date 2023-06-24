import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbars() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <Navbar
      className={`fixed-top shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
    >
        <Navbar.Brand
          href="#home"
          className={`font-bold text-lg sm:text-xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Where in the world?
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <button
            className={`border-0 bg-transparent outline-none cursor-pointer`}
            onClick={toggleTheme}
          >
            <Navbar.Text
              className={`flex items-center ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {darkMode ? (
                <>
                  <FaSun className="mr-1" />
                  Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="mr-1" />
                  Dark Mode
                </>
              )}
            </Navbar.Text>
          </button>
        </Navbar.Collapse>
    </Navbar>
  );
}