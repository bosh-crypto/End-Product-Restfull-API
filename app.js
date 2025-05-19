const express = require('express')
require("dotenv").config();
const app = express()
const port = 3000
const userRouter = require("./user/user.router");
app.use(express.json());

app.use("/api/users" , userRouter);

app.listen(process.env.APP_PORT, () => console.log(`Example app listening on port ${port}! addition of `, process.env.APP_PORT))