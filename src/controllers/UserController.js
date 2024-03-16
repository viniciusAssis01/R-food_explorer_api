const { hash } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");

class UserController {
	async create(request, response) {
		const { name, email, password, confirmPassword } = request.body;

		const userRepository = new UserRepository();
		const userService = new UserService(userRepository);

		const userCreate = await userService.create({
			name,
			email,
			password,
			confirmPassword,
		});
		return response.status(201).json(userCreate);
	}
}

module.exports = UserController;
