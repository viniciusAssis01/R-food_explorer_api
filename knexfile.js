const path = require("path");

module.exports = {
	development: {
		//dentro desse objeto develpment, a propriedades de configuração de conexão do knex com o DB:
		//abaixo estamos dizendo qual DB iremos utilizar
		client: "sqlite3",
		connection: {
			//ao inves de deixar esse endereço cravado, vamos deixar o endereço dinamico conforme onde o pasta do projeto esteja:
			//partindo da pasta do projeto (dirname [significa nome do diretorio]), vai acessar a pasta SRC, q vai acessar a pasta database, q vai acessar o arquivo database.db
			filename: path.resolve(__dirname, "src", "database", "database.db"),
			//ao executar o comando npm run migrate, veremos q será criado um arq database.db na raiz da pasta database (isso se esse arq ja ñ existir)
		},
		pool: {
			// é uma funcionalidade q o q colocarmos dentro dele vai ser executado no momento da conexão com o nosso DB.
			//logo apos criar, vamos executar uma função >
			//vamos manipular a conexao e uma callback > vamos pegar a conexao e rodar o comando chamado "PRAGMA foreign_keys = ON", isso habilita o CASCADE
			afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
		},
		//vamos descrever onde vai ser armazenado as migrations
		migrations: {
			//o nome dessa chave acima é o nome da pasta
			//abaixo é o diretorio/caminho/endereço dessa pasta
			directory: path.resolve(
				__dirname,
				"src",
				"database",
				"knex",
				"migrations"
			),
			//assim caso a pasta ñ existe, ela será criada com base no diretorio/caminho q descrevemos

			//agora Para criarmos o arquivo migration (nessa pasta migrations), vamos rodar o seguinte comando no terminal: npx knex migrate:make nomeDaNossaMigration.
		},
		//uma propriedade configuração padrão para trabalharmos com sqlite
		useNullAsDefault: true,
	},
};
