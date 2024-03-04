//aqui vamos relacionar as migrações de DB utilizando o Knex
//lembre de começar as criar as tabelas a partir das independentes para as dependentes (nessa ordem)
exports.up = (knex) =>
	knex.schema.createTable("users", (table) => {
		//veja q tem q ser table.tipoDaColuna("nomeDaColuna")
		table.increments("id");
		table.text("name").notNullable();
		table.text("email").notNullable();
		table.text("password");
		table
			.enum("role", ["admin", "customer"], {
				useNative: true,
				enumName: "roles",
			})
			.notNullable()
			.default("customer");
		table.timestamp("created_at").default(knex.fn.now());
		table.timestamp("updated_at").default(knex.fn.now());
	});

//processo de deletar a tabela: só descrever o nome da tabela q vamos deletar (ñ precisa da callback)
exports.down = (knex) => knex.schema.dorpTable("users", (table) => {});

//para executar a migration, comando no terminal:
//npx knex migrate:latest
//vamos criar um script no arq package.json, para deixar esse comando mais curto:
//"migrate": "npx knex migrate:latest"
//ñ é obrigatório colocar o NPX, pois ele vai rodar o knex q está instalado na nossa própria app
