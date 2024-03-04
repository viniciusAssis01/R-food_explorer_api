const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishImageController {
	async update(request, response) {
		const { dish_id } = request.params;
		const imageDishName = request.file.filename;
		const diskStorage = new DiskStorage();

		const dish = await knex("dishes").where({ id: dish_id }).first();

		if (!dish) {
			throw new AppError("Prato não encontrado", 401);
		}

		if (dish.image) {
			await diskStorage.deleteFile(dish.image);
		}

		const filename = await diskStorage.saveFile(imageDishName);

		dish.image = filename;

		await knex("dishes").update(dish).where({ id: dish_id });

		return response.json(dish);
	}
}
module.exports = DishImageController;
