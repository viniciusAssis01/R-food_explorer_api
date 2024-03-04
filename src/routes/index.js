//missão desse arq é reunir todas as rotas da nossa aplicação (conter os objetos de roteamento de outros arq)

const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishesRoutes = require("./dishes.routes");

//criado um objeto de roteador principal. Este objeto  vai conter (será responsável por agrupar e organizar) todas as rotas da nossa app
const routes = Router();
//dizendo as rotas q esse objeto roteador principal vai agrupar:
//em media, a quantidade de rotas q temos é de acordo com a qntde  de tabelas em nosso DB.
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dishes", dishesRoutes);

//para trabalharmos com modulos, como estamos o JSvanilla:
module.exports = routes;
