const Task = require("../model/task.Schema");

exports.create = async (req, res) => {
  req.body.assignedBy = req.user.id;
  let task = await Task.create(req.body);
  res.send(task);
};

exports.getAllTask = async (req, res) => {
  let task = await Task.find();
  return res.send(task);
};