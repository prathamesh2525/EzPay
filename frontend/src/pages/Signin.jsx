import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z, object } from "zod"
import axios from "axios"

const Signin = () => {
  // Zod Validation Schema
  const schema = object({
    username: z.string().email(),
    password: z.string().min(6),
  })

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

    // Validate input using Zod
    try {
      schema.pick({ [name]: z.string() }).parse({ [name]: value })
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.errors.flatMap((err) => err.message),
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      schema.parse(formData)

      const res = await axios.post("http://localhost:7878/api/v1/user/signin", {
        username: formData.username,
        password: formData.password,
      })
      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (error) {
      // Handle validation errors
      console.error("Validation error:", error.errors)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className=" mx-10 md:mx-0 bg-white p-8 rounded shadow-md w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email (Username)
            </label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
