// Este pacote permite que o Express lide melhor com erros assíncronos. Simplifica a captura de erros em rotas assíncronas, evitando que você precise usar try/catch em cada uma delas.
require("express-async-errors");

//para usar o arq.env em todo nosso projeto só precisamos importar tal modulo no arquivo principal
require("dotenv/config");

const cors = require("cors");
//Importa o módulo responsável por configurar e inicializar a conexão com o banco de dados SQLite.
const database = require("./database/knex");

/* const uploadConfig = require("./configs/upload"); */

//const connection = require("./database/knex");
//Importa a classe AppError, que é usada para criar erros personalizados com status de código e mensagens específicas para diferentes situações de erro
const AppError = require("./utils/AppError");

const cookieParser = require("cookie-parser");

// Importa o módulo Express, que é um framework para construir aplicativos da web no Node.js (como estivessemos pegando tudo do modulo express e despejando tudas as funcionalidades dentro dessa constante).
const express = require("express");

//importando o o arquivo index.js da pasta routes
const routes = require("./routes");
//quando ñ dizemos o nome do arquivo que queremos acessar de uma pasta, por padrão ele acessa o arquivo index (se ele existir) - caso esse arquivo ñ exista, temos q descrever o arq.ext

database();

//Inicializa o aplicativo Express.
const app = express();
//dizer q vamos receber os dados da requisições no formato JSON (habilita o middleware q interpreta o corpo das solicitações HTTP como JSON).
app.use(express.json());
/* app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); */
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
		credentials: true,
	})
);

//dizer q vamos usar as rotas definidas no arq importado, assim, permitindo q essas rotas sejam acessadas.
app.use(routes);

/* //O MIDDLEWARE sao funções q tem acesso ao objeto da solicitação (requsição), objeto de respostas (resposta caso middleware barre a req), e a proxima função (q seria a função q iria executar essa requisição [ja q o middleware é um interceptador de req]) ---------o middleware sempre precisa chamar a próxima função/destino da req (se ñ nossa aplicação/requisição vai ficar travada no middleware). exceção: a ñ ser se esse middleware tiver um return (caso o middleware bloquei o prosseguimento da req)

tratamento de exceção: serve para identificarmos de onde está vindo o erro (do lado do cliente[requisições] ou do servidor [nossa api, escrevemos algo errado...])
Normalmente esses cracheiam/param a nossa app. E para isso ñ acontecer (parar a app), usamos tratamento de exeção (p/lidar com esses erros)

//Middleware de tratamento de exceçãoerros: Se houver um erro (em qlq lugar da app) q ñ foi tratado, este middleware captura o erro. Se o erro for uma instância de AppError, ele retorna um JSON com o status e a mensagem definidos na instância do erro. Se não for, retorna um erro genérico com status 500.*/
app.use((error, request, response, next) => {
	//queremos saber se o erro foi gerado do lado do cliente: para isso fazemos:
	//se o error tiver a mesma instancia do AppError
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
	}
	//deixamos esse console.error para nos ajudar a debugar/resolver o problema caso a gente precise
	console.error(error);

	//para saber se o erro foi gerado do lado do servidor:se o erro ñ foi gerado do lado do cliente (cliente fez alguma requisição errada) nem do lado do servidor (escrevemos algo errado na nossa logica), vamos emitir um erro padrão
	return response.status(500).json({
		status: "error",
		message: "Internal server Error",
	});
});

/* // Definir a porta onde o servidor estará escutando.
//backend express normalmente usam a porta 3000 */
const PORT = process.env.PORT || 3000;
const runningMsg = `server running on http://localhost:${PORT}`;

/* // Inicia o servidor na porta especificada e exibe uma mensagem indicando que o servidor está rodando. nosso app express vai escutar/executar (listen) (inicia o servidor na porta especificada) a porta e exibe uma mensagem indicando q o servidor está rodando em...
//meio q cria um live-server para gente */
app.listen(PORT, () => {
	console.log(runningMsg);
});

/*
entendendo a logica da nossa API:

OBS: atraves do arquivo package.json, no objeto scripts, conseguimos ver qual é o arquivo inicial/principal (o arq ponto de entrada) da nossa app. isto é:

 qndo fizermos uma requisição (no caso estamos testando pelo insomnia):
>  vai entrar no arq server.JS (q no caso é nosso arq principal/main)
>  q entrar no comando “app.use(routes)” (igual dar Ctrl+clique em routes do comando) 
>  q vai nos levar para o arq "index.js" da pasta routes 
>  q vai chamar (de acordo com o q foi requisitado) o arq routes especico 
>  q dai vai chamar o respectivo controller (q executa as funcionalidades > e cada funcionalidade manipula o DB, atraves do knex [querybuilder])
os controladores sao responsveis por processar a requisição HTTP, interagir com DB e retornar respostas apropriadas
*/
