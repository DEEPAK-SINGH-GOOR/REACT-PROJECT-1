const { Router } = require("express");
const userController = require("../controllers/userControllers");
const routes = Router();
routes.post("/login", userController.login);
routes.post("/signup", userController.createUser)
routes.get("/", userController.getAllUsers)

module.exports = routes;