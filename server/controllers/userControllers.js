const User = require("../model/userSchema");
const { hashPassword, genereateToken } = require("../utils/helper");
const { compare } = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(403).send({ message: "User already exists" });
    }

    req.body.password = await hashPassword(req.body.password);
    user = await User.create(req.body);

    let token = await genereateToken({
      name: user.name,
      role: user.role,
      id: user.id,
    });

    return res.status(201).send({ user, token });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(403).send({ message: "User not found" });
    }

    let isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(403).send({ message: "Invalid password" });
    }

    let token = await genereateToken({
      name: user.name,
      role: user.role,
      id: user.id,
    });

    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) query.role = role;

    let users = await User.find(query);
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: "Server error", error: error.message });
  }
};
