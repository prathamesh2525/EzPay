// Footer.jsx
import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className=" w-full bg-gray-800 text-white p-4 border-t border-gray-600">
      <div className="container mx-auto flex justify-between items-center h-16">
        {/* Footer Content */}
        <div>
          <p className="text-sm">&copy; 2024 EzPay. All rights reserved.</p>
          <p className="text-sm">Terms of Service | Privacy Policy</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 items-center">
          <a href="#" className="text-white hover:text-gray-300">
            <svg
              className="h-5 w-5"
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
          </a>
          <button
            onClick={() => {
              localStorage.setItem("token", "")
              setTimeout(() => {
                navigate("/signin")
                // window.location.reload(false)
              }, 700)
            }}
            className="p-2 bg-gray-700 rounded hover:opacity-75"
          >
            Signout
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
