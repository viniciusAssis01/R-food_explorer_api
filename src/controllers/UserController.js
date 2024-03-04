const { hash } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");

class UserController {
	//antes de criar as funcionalidades, crie as requisições lá no insomnia, para vc saber como virão os dados da requisição
	/* lembrando que, por boas praticas, um controller pode ter até 5 métodos:
  --index: pra listar varios registros (get)
  --show: listar um registro especifico (get)
  --create: criar um registro (post)
  --update: atualizar um registro (put/patch)
  --delete: deletar um registro (delete)
  */

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
