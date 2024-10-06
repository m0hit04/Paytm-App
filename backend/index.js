const express = require("express");
const cors = require('cors');
const rootRouter = require('./routes');

const app = express();
app.use(cors())
app.use(express.json())

// route every requests to /api/v1
app.use("/api/v1", rootRouter)

app.listen(3000, () => {
    console.log("Server started");
})