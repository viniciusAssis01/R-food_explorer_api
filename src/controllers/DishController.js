const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishController {
	async create(request, response) {
		const { name, category, price, description, ingredients, image } =
			request.body;

		const [dish_id] = await knex("dishes").insert({
			name,
			category,
			price,
			description,
			image,
		});

		const ingredientsInsert = ingredients.map((ingredient) => {
			return {
				dish_id,
				name: ingredient,
			};
		});

		await knex("ingredients").insert(ingredientsInsert);

		const dish = await knex("dishes").where({ id: dish_id }).first();
		const ingredientsDish = await knex("ingredients")
			.where({ dish_id: dish.id })
			.orderBy("name");

		return response.status(201).json({ ...dish, ingredientsDish });
	}

	async show(request, response) {
		const { id } = request.params;

		const dish = await knex("dishes").where({ id }).first();

		const ingredients = await knex("ingredients")
			.where({ dish_id: dish.id })
			.orderBy("name");

		return response.status(200).json({
			...dish,
			ingredients,
		});
	}

	async index(request, response) {
		const { name, ingredients } = request.query;

		let dishes;

		if (ingredients) {
			const filterIngredient = ingredients
				.split(",")
				.map((ingredient) => ingredient.trim());
			//console.log(filterIngredient);

			dishes = await knex("ingredients")
				.select(["ingredients.id", "ingredients.name", "dishes.*"])
				/* .whereLike("dishes.name", `%${name}%`) */
				.whereIn("ingredients.name", filterIngredient)
				.innerJoin("dishes", "dishes.id", "ingredients.dish_id")
				.orderBy("dishes.name");
		} else if (name) {
			dishes = await knex("dishes")
				.whereLike("name", `%${name}%`)
				.orderBy("name");
		} else {
			dishes = await knex("dishes").orderBy("dishes.name");
		}

		return response.json(dishes);
	}

	async update(request, response) {
		const { id } = request.params;
		const { name, category, ingredients, price, description, image } =
			request.body;

		const dish = await knex("dishes").where({ id }).first();

		if (!dish) {
			throw new AppError("Prato não encontrado", 401);
		}

		const dishIngredients = await knex("ingredients")
			.where({ dish_id: id })
			.orderBy("name");

		if (!dishIngredients) {
			throw new AppError("Ingredientes não encontrados", 401);
		}

		dish.name = name ?? dish.name;
		dish.category = category ?? dish.category;
		dish.price = price ?? dish.price;
		dish.description = description ?? dish.description;
		dish.image = image ?? dish.image;

		await knex("dishes")
			.update({
				name: dish.name,
				category: dish.category,
				price: dish.price,
				description: dish.description,
				image: dish.image,
				updated_at: knex.fn.now(),
			})
			.where({ id });

		await knex("ingredients").where({ dish_id: id }).delete();

		const ingredientsInsert = ingredients.map((ingredient) => {
			return {
				dish_id: id,
				name: ingredient,
			};
		});

		await knex("ingredients").insert(ingredientsInsert);

		return response
			.status(200)
			.json({ message: "Prato atualizado com sucesso" });
	}

	async delete(request, response) {
		const diskStorage = new DiskStorage();
		const { id } = request.params;

		const dish = await knex("dishes").where({ id }).first();

		if (!dish) {
			throw new AppError("Prato não encontrado", 401);
		}

		if (dish.image) {
			diskStorage.deleteFile(dish.image);
		}

		await knex("dishes").where({ id }).delete();

		//alert("Prato excluído com sucesso");

		return response.status(200).json({ message: "Prato excluído com sucesso" });
	}
}

module.exports = DishController;
