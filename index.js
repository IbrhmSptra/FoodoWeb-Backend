const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT | 3000;
const apiRoutes = require("./src/routes/apiRoutes");
const authRoutes = require("./src/routes/authRoutes");
const cookieParser = require("cookie-parser");

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Foodo API");
});
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.all("*", (req, res) => {
  res
    .status(404)
    .send({ message: "Sorry, the route you are going to does not exist" });
});

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
