import { useContext, useState } from "react"
import axios from "axios"
import { AmountContext } from "../App"

const SendMoneyModal = ({ user, closeModal }) => {
  const { amount, setAmount } = useContext(AmountContext)

  const handleSendMoney = async () => {
    try {
      // Implement logic to send money to the selected user
      console.log(`Sending ₹${amount} to ${user?.firstName}`)
      console.log(user)

      // Add API call to initiate transfer
      const res = await axios.post(
        "http://localhost:7878/api/v1/account/transfer",
        {
          to: user?._id,
          amount: amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      console.log(res.data)
      closeModal()
    } catch (error) {
      console.error("Error during send money:", error)
      // Handle the error (e.g., show an error message to the user)
    }
  }

  return (
    <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-md w-80 md:w-96">
        <h3 className="text-xl font-semibold mb-4">
          Send Money to {user?.firstName}
        </h3>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSendMoney}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
          <button
            onClick={closeModal}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SendMoneyModal
