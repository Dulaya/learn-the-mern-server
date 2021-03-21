import express from "express";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";

import User from "../model/user.js";

const router = express.Router();

router.post("/", async (request, response) => {
  //Validate data
  const { error } = registerValidation(request.body);
  if (error) return response.status(400).send(error.details[0].message/*.join("\n")*/);

  //Check if user is alread in database
  const userExist = await User.findOne({
    username: request.body.username
  });
  if (userExist) return response.status(400).send("Username already exists");

  //Check if email is alread in database
  const emailExist = await User.findOne({
    email: request.body.email
  });
  if (emailExist) return response.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(request.body.password, salt);

  //Create a new user
  const user = new User({
    username: request.body.username,
    email: request.body.email,
    password: hashPassword,
  });

  try {
    //Save user to database if no errors
    const savedUser = await user.save();

    //If there's no error, send success to client.
    response.send(savedUser);
  } catch (error) {
    //If there's an error, send error to client.
    response.status(400).send(error);
  }

});

/*gisterValidation = data => {
  let error = {
    details: [{
      message: []
    }]
  };

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
    return {
      error: error
    };
  }

  //What's the return empty object for?
  return {};
}
*/

//Register Validation
//Using @hapi/joi for verification
const registerValidation = (data) => {
  const schema = Joi.object({
      username: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
  });
  return schema.validate(data);
}

export default router;