const express = require('express')
const app = express()

const dotenv = require("dotenv")

const authRouter = require("./routes/authRoute")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const databaseConnect = require("./config/database")

dotenv.config({
  path : "backend/config/config.env"
})

app.use("/api/messenger", authRouter)
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
  res.send('ok')
});

try {
  databaseConnect.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.error('Connection error:', error);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})