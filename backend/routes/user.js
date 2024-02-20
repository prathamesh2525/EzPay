const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User } = require("../db")
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
    return res.statud(411).json({
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

module.exports = userRouter
