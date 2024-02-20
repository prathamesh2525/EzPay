const express = require("express")
const mongoose = require("mongoose")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")

const accountRouter = express.Router()

accountRouter.get("/", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId })
  res.json({ balance: account.balance })
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession()

  session.startTransaction()
  const { to, amount } = req.body

  // fetch the account from which funds are to be transferred
  const fromAccount = await Account.findOne({ userId: req.userId }).session(
    session
  )

  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction()
    return res.status(400).json({
      message: "Insufficient Balance",
    })
  }

  // fetch the account to which funds are to be deposited to
  const toAccount = await Account.findOne({ userId: to }).session(session)

  if (!toAccount) {
    await session.abortTransaction()
    return res.status(400).json({
      message: "Inovalid Account",
    })
  }

  // amount tranfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session)
  await Account.updateOne(
    { userId: to.userId },
    { $inc: { balance: amount } }
  ).session(session)

  // commit the transaction
  await session.commitTransaction()
  res.json({
    message: "Transfer Successfull!",
  })
})

module.exports = accountRouter
