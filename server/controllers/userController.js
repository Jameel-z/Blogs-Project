import { cookie } from "express-validator";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//handle errors function
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect emial
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is not registered";
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//create token function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "my own secret to hash", {
    expiresIn: maxAge, //takes value in seconds unlike cookies in ms
  });
};

//sign up for a new user
const signUpPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    //create jwt token and send it
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token);

    //create username cookie and send it to navbar
    const username = email.split("@")[0];
    res.cookie("username", username);

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//login try email and pass and if exist
const loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token);

    //create username cookie and send it to navbar
    const username = email.split("@")[0];
    res.cookie("username", username);

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//log the user out
const logoutGet = async (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("username");

  res.status(200).end();
};

export { signUpPost, loginPost, logoutGet };
