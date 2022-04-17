const express = require('express')

const app = express()
const dotenv = require("dotenv")

const databaseConnect = require("./config/database")
const authRouter = require("./routes/authRoute")

dotenv.config({
  path : "backend/config/config.env"
})

app.use("api/messenger", authRouter)

app.get('/', (req, res) => {
  res.send('ok')
});

databaseConnect()

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
