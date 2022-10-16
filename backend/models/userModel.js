const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  betting_score: {
    type: Number,
    required: true,
  },
  trust_score: {
    type: Number,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  password
) {
  //validation
  if (!firstname || !lastname || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const user = await this.create({
    firstname,
    lastname,
    email,
    password,
    betting_score: 0,
    trust_score: 0,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  if (password != user.password) {
    throw Error("Incorect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
