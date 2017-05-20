import { IRouteProvider } from '../core';
import { Router } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class HomeRouterProvider implements IRouteProvider {


    public getRoutes(): Router {
        
        let router = Router();
        
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.send({ message: 'Hello World!' });
        });

        return router;
    }

}