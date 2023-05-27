const express = require("express");
const app = express();
const cors = require("cors");
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const user = require("./routes/userRoute")
app.use("/api/v1", user);

app.use(cors());
module.exports = app;