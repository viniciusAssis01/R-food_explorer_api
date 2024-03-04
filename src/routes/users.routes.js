const { Router } = require("express");

//Importa o controlador (UsersController) responsável por lidar com as operações relacionadas aos usuários na aplicação. Os controladores são responsáveis por processar as requisições HTTP, interagir com o banco de dados (se necessário) e retornar respostas apropriadas.
const UsersController = require("../controllers/UserController");

//Cria um novo objeto de roteamento usando a função Router()
//Esse objeto usersRoutes será usado para definir as rotas relacionadas aos usuários.
//todas as rotas de usuario vamos deixar aqui dentro.
const usersRoutes = Router();
//Cria uma instância do UsersController. Isso permite acessar os métodos e funcionalidades definidos dentro desse controlador.
const usersController = new UsersController();
//Define uma rota para lidar com requisições HTTP do tipo POST para o endpoint /. Quando uma requisição POST é feita para este endpoint, o método create do UsersController é chamado para processar a requisição.
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;
