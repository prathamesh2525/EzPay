import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:7878/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      setUser(res.data.user)
    }
    fetchUser()
  }, [])

  return (
    <header className="bg-gray-800 text-white p-4 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Logo or Branding */}
        <Link to="/" className="text-2xl font-bold">
          EzPay
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Responsive Hamburger Menu - Shown on Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 h-screen w-full bg-gray-800 ">
            <button className="text-white ml-4 mt-4" onClick={closeMenu}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <nav className="flex flex-col items-center pt-16">
              <Link
                to="/signin"
                className="text-white py-2 hover:bg-gray-700"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-white py-2 hover:bg-gray-700"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </nav>
          </div>
        )}

        {/* Navigation Links - Hidden on Mobile */}
        {user ? (
          <nav className="flex items-center gap-2">
            <p className="p-2 px-3 rounded-full bg-gray-700">U</p>
            <div>
              Hello <span className="font-bold">{user.firstName}</span>{" "}
            </div>
          </nav>
        ) : (
          <nav className={`lg:flex space-x-4 ${!isMenuOpen ? "hidden" : ""}`}>
            <Link
              to="/signin"
              className="hover:text-gray-300 "
              onClick={closeMenu}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="hover:text-gray-300"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
