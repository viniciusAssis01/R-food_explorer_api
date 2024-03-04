/* estamos utilizando o knex para criar uma conexão com o DB com base nas configurações fornecidas em um arq chamdo knexfile.js */

/* para q o knex possa se conectar com o DB, vamos: 
dentro da pasta database, vamos criar uma pasta knex > e dentro dessa pasta, criar um arq index.js > dentro desse arq vamos trazer as configurações do knex.
*/
const config = require("../../../knexfile");
const knex = require("knex");

//criando a conexão:
//vamos falar q é uma conexão knex, e as configurações de conexão q iremos usar é a de development (dentro do nosso config [aqle arquivo de configuração de kenx], temos as configurações de desenvolvimento )
const connection = knex(config.development);

module.exports = connection;

//pronto está feito a conexão do knex com o nosso DB.
