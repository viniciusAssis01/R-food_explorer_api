const { Router } = require("express");

const UsersController = require("../controllers/UserController");
const UsersValidatedController = require("../controllers/UserValidatedController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.get(
	"/validated",
	ensureAuthenticated,
	usersValidatedController.index
);

module.exports = usersRoutes;
