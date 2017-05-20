import { apiMethod, IRouteProvider } from '../core';
import { inject, injectable } from "inversify";
import { Router } from "express";
import { Container } from "inversify";
import { IUserRepository, User } from "app-data-contracts";

@injectable()
export class UserRouteProvider implements IRouteProvider {
    
    @inject(Container)
    public container:Container;
        
    
    /**
     * get Routes
     */
    public getRoutes(): Router {
        const router:Router = Router();

        router.get( '/', this.getAll );
        router.get( '/:id', this.getById );

        // router...
        return router;
    }


    private getRepository():IUserRepository {
        return this.container.get<IUserRepository>("IUserRepository");
    }


    
    /**
     * Return all users
     */
    public getAll:any = apiMethod( async req => {

        const repository:IUserRepository = this.getRepository();
    
        const data:any = await repository.find('', 1, 20);

        return {data};
    });

    

    /**
     * Get user by id...
     */
    public getById:any = apiMethod(async req => {

        const repository:IUserRepository = this.getRepository();
        
        const id:number = parseInt( req.params.id );

        const data:User = await repository.getById(id);

        return {data};
    });

}