import express from "express";
const router = express.Router();
import User from "../model/user.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  //Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message.join("\n"));

  //Check if user is alread in database
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) return res.status(400).send("Username already exists");

  //Check if email is alread in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

function registerValidation(data) {
  let error = { details: [{ message: [] }] };

  if (data["username"].trim().length == 0) {
    error.details[0].message.push("Username is empty");
  }

  if (data["email"].trim().length == 0) {
    error.details[0].message.push("Email is empty");
  }

  if (data["password"].trim().length < 4) {
    error.details[0].message.push("Password must be atleast 4 characters long");
  }

  if (error.details[0].message.length != 0) {
    return { error: error };
  }
  return {};
}

export default router;
