import { Router } from "express";

import PeopleController from "./app/controllers/PeopleController";
import PropertyController from "./app/controllers/PropertyController";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";


import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// PUBLIC ROUTES

routes.post("/login", SessionController.store);

//routes.use(authMiddleware);

// PRIVATE ROUTES
routes.post("/people", PeopleController.store);
routes.post("/property", PropertyController.store);
routes.post("/user", UserController.store);

routes.get("/people", PeopleController.index);
routes.get("/property", PropertyController.index);
routes.get("/user", UserController.index);

export default routes;
