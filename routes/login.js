import express from "express";
import bcrypt from "bcrypt";
import Joi from "@hapi/joi";

import User from "../model/user.js";

const router = express.Router();

router.post("/", async (request, response) => {
  //Validate data
  const { error } = loginValidation(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  //Check if user is alread in database
  const username = await User.findOne({
    username: request.body.username,
  });
  if (!username) return response.status(400).send("Username doesn't exists");

  const validPass = await bcrypt.compare(request.body.password, username.password);
  if (!validPass) return response.status(400).send("Password is invalid");

  response.send("Login Success!");
});

//Login Validation
//Using @hapi/joi for verification
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export default router;
