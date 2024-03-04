const UserRepository = require("../repositories/UserRepository");
const SessionService = require("../services/SessionService");

class SessionsController {
	async create(request, response) {
		const { email, password } = request.body;

		const userRepository = new UserRepository();
		const sessionService = new SessionService(userRepository);

		const login = await sessionService.create({ email, password, response });

		response.status(201).json(login);
	}
}

module.exports = SessionsController;
