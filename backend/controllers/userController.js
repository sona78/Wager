const User = require("../models/userModel");
const mongoose = require("mongoose");

//login user
const loginUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.login(email, password);
    betting_score = user.betting_score;
    trust_score = user.trust_score;
    res
      .status(200)
      .json({ firstname, lastname, email, betting_score, trust_score });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signup user
const signupUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.signup(firstname, lastname, email, password);
    betting_score = user.betting_score;
    trust_score = user.trust_score;
    res
      .status(200)
      .json({ firstname, lastname, email, betting_score, trust_score });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

module.exports = { loginUser, signupUser, getUsers };
