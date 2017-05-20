import { inject, injectable } from "inversify";
import { Container } from "inversify";
import { Router } from 'express';

import { apiMethod,  IRouteProvider } from '../core';
import { IGroupRepository, Group } from 'app-data-contracts';


@injectable()
export class GroupRouteProvider implements IRouteProvider {

    @inject(Container)
    public container:Container;

    public getRoutes(): Router {
        
        const router:Router = Router();

        router.get('/', this.getAll);
        router.get('/:id', this.getById);

        return router;
    }

    private getRepository() : IGroupRepository {
        return this.container.get<IGroupRepository>("IGroupRepository");
    }


    /**
     * Return all users
     */
    public getAll:any = apiMethod( async req => {

        const repository:IGroupRepository = this.getRepository();

        const data:any = await repository.find('', 1, 20);

        return {data};
    });

    

    /**
     * Get user by id...
     */
    public getById:any = apiMethod(async req => {

        const repository:IGroupRepository = this.getRepository();
        
        const id:number = parseInt( req.params.id );

        const data:Group = await repository.getById(id);

        return {data};
    });


}