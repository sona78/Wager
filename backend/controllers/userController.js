const User = require("../models/userModel");

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

module.exports = { loginUser, signupUser };
