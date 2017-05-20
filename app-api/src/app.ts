import 'reflect-metadata';

import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Container } from "inversify";

import { IRouteProvider } from './core';
import { RouterDiSetup } from './routes/router-di-setup';
import { DbConfig, RepositoryDiSetup } from 'app-data';

const DEFAULT_DB_CONFIG = require( path.join(__dirname, '../config/', 'database.json'));

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;


  private container: Container;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.container = new Container();
    this.middleware();
    this.dependencyRegistration();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {

    console.info(path.join(__dirname, 'www'));

    
    this.express.use(logger('dev'));
    this.express.use('/', express.static(path.join(__dirname, 'www')) );
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));

  }


  private dependencyRegistration() : void {
        //
        this.container.bind<DbConfig>( "DefaultDbConfig" ).toConstantValue( new DbConfig( DEFAULT_DB_CONFIG ) );
        this.container.bind<Container>(Container).toConstantValue(this.container);
        
        new RepositoryDiSetup().setup(this.container);
        
        new RouterDiSetup().setup(this.container);
  }

  // Configure API endpoints.
  private routes(): void {
    
    this.express.use( '/api/v1/home', this.container.get<IRouteProvider>("HomeRouteProvider").getRoutes() );
    this.express.use('/api/v1/groups', this.container.get<IRouteProvider>("GroupRouteProvider").getRoutes() );
    this.express.use('/api/v1/users', this.container.get<IRouteProvider>("UserRouteProvider").getRoutes() );

  }

}

export default new App().express;