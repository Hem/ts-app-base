import { GroupRouteProvider } from './group-router';
import { Container } from "inversify";
import { HomeRouterProvider,  UserRouteProvider } from './';
import { IRouteProvider } from "../core";


export class RouterDiSetup {

    public setup(container: Container): void {
        
        container.bind<IRouteProvider>("HomeRouteProvider").to(HomeRouterProvider);
        container.bind<IRouteProvider>("UserRouteProvider").to(UserRouteProvider);
        container.bind<IRouteProvider>("GroupRouteProvider").to(GroupRouteProvider);
    }
}