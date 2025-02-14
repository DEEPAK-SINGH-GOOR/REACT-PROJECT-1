const { Router } = require("express");
const taskController = require("../controllers/taskControllers");
const routes = Router();
routes.post("/", taskController.create);
routes.get("/", taskController.getAllTask);
module.exports = routes;