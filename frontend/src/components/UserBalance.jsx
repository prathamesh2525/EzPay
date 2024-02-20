// UserBalance.jsx

const UserBalance = ({ balance }) => {
  return (
    <div className="bg-white p-4 rounded-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Your Balance</h3>
      <p className="text-2xl">₹{balance}</p>
    </div>
  )
}

export default UserBalance
