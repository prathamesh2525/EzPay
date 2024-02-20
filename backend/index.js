const express = require("express")
const cors = require("cors")
const rootRouter = require("./routes/index")
require("dotenv/config")

const PORT = process.env.PORT || 7999
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
  console.log(`App Listening on https://locakhost:${PORT}`)
})
