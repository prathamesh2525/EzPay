// DashboardPage.jsx

import { useState, useEffect } from "react"
import UserBalance from "../components/UserBalance"
import UserList from "../components/UserList"
import axios from "axios"

const DashboardPage = () => {
  const [userBalance, setUserBalance] = useState(0)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user balance
        const balanceResponse = await axios.get(
          "http://localhost:7878/api/v1/account",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        setUserBalance(balanceResponse.data.balance)

        // Fetch user list
        const userListResponse = await axios.get(
          "http://localhost:7878/api/v1/user/bulk",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        setUserList(userListResponse.data.users)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto p-8 ">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <UserBalance balance={userBalance} />
        <UserList userList={userList} />
      </div>
    </div>
  )
}

export default DashboardPage
