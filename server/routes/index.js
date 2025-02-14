const { Router } = require("express");
const userRoutes = require("./user");
const taskRoute = require("./task")
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/task", taskRoute)
module.exports = routes;

