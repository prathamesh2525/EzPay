import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Link className="underline text-2xl hover:" to={"/signup"}>
        Go to Signup Page
      </Link>
    </div>
  )
}

export default Home
