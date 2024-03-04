const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}
	async create({ name, email, password, confirmPassword }) {
		const checkUserExist = await this.userRepository.findByEmail(email);

		if (checkUserExist) {
			throw new AppError("Este e-mail ja está em uso.");
		}

		const hashedPassword = await hash(password, 8);

		if (password && !confirmPassword) {
			throw new AppError("Voce precisa confirmar a senha");
		}
		if (password !== confirmPassword) {
			throw new AppError("Senha de confirmação incorreta");
		}

		await this.userRepository.createUser({
			name,
			email,
			password: hashedPassword,
		});

		const user = await this.userRepository.findByEmail(email);

		delete user.password;

		return user;
	}
}
module.exports = UserService;
