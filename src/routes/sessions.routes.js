const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
//definindo uma rota para lidar com a requisição HTTP do tipo POST para o endpoint /. qndo uma requisição POST é feita para este endpoint, o método create do sessionsController é chamado par aprocessar a requisição
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;
