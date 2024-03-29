const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const { authMiddleware } = require("../middleware")
const userRouter = express.Router()

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body)
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  })
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/ Incorrect inputs",
    })
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
  const userId = newUser._id

  // ----------- Created new Account for the User

  await Account.create({
    userId,
    balance: Math.floor(Math.random() * (15000 - 10000 + 1)) + 5000,
  })

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  )

  res.json({
    message: "User created successfully!",
    token: token,
  })
})

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
})

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body)

  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    })
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    )

    res.json({ token: token })

    return
  }

  res.status(411).json({
    message: "error while loggin in",
  })
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body)

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    })
  }
  await User.findOneAndUpdate({ _id: req.userId }, req.body)

  res.json({
    message: "Updated successfully!",
  })
})

// route to get user info
userRouter.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.userId })
  res.json({ user })
})

// Route to get users from backend - needed so users can search for their friends and send them money

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || ""
  try {
    const users = await User.find({
      $and: [
        {
          _id: {
            $ne: req.userId,
          },
        },
        {
          $or: [
            {
              firstName: {
                $regex: filter,
              },
            },
            {
              lastName: {
                $regex: filter,
              },
            },
          ],
        },
      ],
    })

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    })
  } catch (error) {
    return res.status(411).json({
      message: "Error!",
    })
  }
})

module.exports = userRouter
