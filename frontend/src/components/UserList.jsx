// UserList.jsx

import React, { useState } from "react"
import SendMoneyModal from "./SendMoneyModal"

const UserList = ({ userList }) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSendMoney = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white p-4 rounded-md min-w-72">
      <h3 className="text-xl font-semibold mb-4">Send Money</h3>
      <ul>
        {userList.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-2">
              <p className="bg-gray-300 px-3 py-1 rounded-full">U</p>
              <p className="font-semibold">{user.firstName}</p>
            </div>
            <button
              onClick={() => handleSendMoney(user)}
              className="bg-blue-500 text-white md:p-2 rounded-md hover:bg-blue-600 p-1 text-sm md:text-base"
            >
              Send Money
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <SendMoneyModal user={selectedUser} closeModal={closeModal} />
      )}
    </div>
  )
}

export default UserList
