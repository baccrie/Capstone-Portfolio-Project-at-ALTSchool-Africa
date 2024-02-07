const express = require("express");
require("dotenv").config();

const localeRouter = require("./routes/locale");

const app = express();
const PORT = process.env.PORT;

app.use("/api/v1/nigeria", localeRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "api working...",
  });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: "an error occured" });
});

app.listen(PORT, () => {
  console.log("Server is listening to port 8000....");
});
