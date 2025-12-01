const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const dataRouter = require("./routes/data.routes");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

//router
app.use(authRouter);
app.use(dataRouter);

app.listen(PORT, () => {
  console.log("server is running at:", PORT);
});
