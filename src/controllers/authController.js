const { createAccount, getAccount } = require("../models/authModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const data = req.body;
    // if account with that email already exists
    const account = await getAccount(data.email);
    if (account) {
      return res.status(400).json({
        message: "Email alredy exists",
      });
    }
    const created = await createAccount(data);
    res.status(200).json({
      data: {
        uuid: created.uuid,
        email: created.email,
        username: created.username,
      },
      message: "Create Account Success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await getAccount(email);

    // account doesnt find
    if (!account) {
      return res.status(400).send({ message: "Account not found" });
    }

    //wrong password
    const isPasswordValid = bcrypt.compareSync(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Wrong Password" });
    }

    //give token (Authentication)
    const SECRET_KEY = process.env.SECRET_KEY;
    const days = 7 * (1000 * 60 * 60 * 24);
    const token = jwt.sign(
      {
        uuid: account.uuid,
        email: account.email,
        username: account.username,
      },
      SECRET_KEY,
      { expiresIn: "7D" }
    );

    //set cookie for remember user info with jwt
    res.cookie("token", token, {
      maxAge: days,
      httpOnly: true,
      secure: false, // Ensure this is false for HTTP (localhost)
      sameSite: "lax", // Cross-origin requests
    });
    //send user info non credentials
    res.status(200).send({
      data: {
        uuid: account.uuid,
        email: account.email,
        username: account.username,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).send({ message: "Unauthorized user" });
    }
    res
      .status(200)
      .clearCookie("token")
      .send({ message: "Successfully Logout" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const validate = (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "valid", user });
};

module.exports = { register, login, logout, validate };
