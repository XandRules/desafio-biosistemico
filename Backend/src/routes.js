import { Router } from "express";

import PeopleController from "./app/controllers/PeopleController";
import PropertyController from "./app/controllers/PropertyController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import DashboardController from "./app/controllers/DashboardController";


import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// PUBLIC ROUTES

routes.post("/login", SessionController.store);

//Para usar a rota privada ativar o middleware de autenticação e enviar o jwt
//routes.use(authMiddleware);

// PRIVATE ROUTES
routes.post("/people", PeopleController.store);
routes.post("/property", PropertyController.store);
routes.post("/user", UserController.store);

routes.get("/people", PeopleController.index);
routes.get("/property", PropertyController.index);
routes.get("/user", UserController.index);
routes.get("/dashboard", DashboardController.index);

routes.put('/people/:id',PeopleController.update);
routes.put('/property/:id',PropertyController.update);
routes.put('/user/:id',UserController.update);

routes.delete('/people/:id',PeopleController.delete);
routes.delete('/property/:id',PropertyController.delete);
routes.delete('/user/:id',UserController.delete);

export default routes;
