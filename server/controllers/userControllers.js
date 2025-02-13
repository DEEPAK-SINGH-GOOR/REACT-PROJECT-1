const { request } = require("express");
const User = require("../model/userSchema");
const { hashPassword, genereateToken } = require("../utils/helper");
const { compare } = require("bcrypt");

exports.createUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).send({ message: "User already exists" });
  }
  req.body.password = await hashPassword(req.body.password);
  user = await User.create(req.body);
  let token = await genereateTokewwwn({
    name: user.name,
    role: user.role,
    id: user.id,
  });
  return res.status(201).send({ user, token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email })
  if (!user) {
    return res.status(403).send({ message: "user not found" })
  }

  let isMatch = await compare(user.password, password)
  if (!isMatch) {
    return res.status(403).send({ message: "invalid password" })
  }

  let token = await genereateToken({
    name: user.name,
    role: user.role,
    id: user.id,
  })
  return res.status(201).send({ user, token })
}
exports.getAllUsers = async (req, res) => {
  let users = await User.find();
  res.status(200).send(users);
};