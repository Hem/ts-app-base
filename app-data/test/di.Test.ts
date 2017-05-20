import { IUserRepository } from 'app-data-contracts/dist';
import 'reflect-metadata';

import { RepositoryDiSetup } from '../src/repository-di-setup';
import { GroupRepository } from '../src';
import { DbConfig, IGroupRepository, Group } from 'app-data-contracts';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';
import { Container } from "inversify";

const DEFAULT_DB_CONFIG = require('./db/config.json');

@suite class DiTest {

    static container:Container;

    static before() { 
        const dbConfig = new DbConfig( DEFAULT_DB_CONFIG );

        const container = new Container();
        
        container.bind<DbConfig>("DefaultDbConfig").toConstantValue(dbConfig);

        // container...
        new RepositoryDiSetup().setup(container);

        this.container = container;
    }

    @test testFindUserRepository() {
        const repository = DiTest.container.get<IUserRepository>("IUserRepository");
        expect(repository).to.be.an('object');
    }


    @test testFindUser() {

        const repository = DiTest.container.get<IUserRepository>("IUserRepository");

         return repository.getById(1).then(data => {
            expect(data).to.be.an('object');
            expect(data).to.be.deep.eq({ id: 1, name: 'Hem' });
        });
    }

}    
