import { Router } from "express";

export interface IRouteProvider {    
    getRoutes():Router;    
}