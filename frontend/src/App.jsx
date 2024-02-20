import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Send from "./pages/Send"
import { createContext, useState } from "react"

export const AmountContext = createContext()

function App() {
  const [amount, setAmount] = useState(0)
  return (
    <div>
      <AmountContext.Provider value={{ amount, setAmount }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
          </Routes>
          <Footer />
        </Router>
      </AmountContext.Provider>
    </div>
  )
}

export default App
