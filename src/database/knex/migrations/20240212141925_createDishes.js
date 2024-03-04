exports.up = (knex) =>
	knex.schema.createTable("dishes", (table) => {
		table.increments("id");
		table.text("name").notNullable();
		table.text("image").nullable();
		table
			.enum("category", ["refeição", "sobremesa", "bebida"], {
				useNative: true,
				enumName: "roles",
			})
			.notNullable()
			.default("refeição");
		table.decimal("price", 5, 2).notNullable();
		table.text("description").notNullable();
		table.timestamp("created_at").default(knex.fn.now());
		table.timestamp("updated_at").default(knex.fn.now());
	});

exports.down = (knex) => knex.schema.dorpTable("dishes", (table) => {});
