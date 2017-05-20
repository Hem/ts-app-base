import 'reflect-metadata';
import { UserRepository } from '../src';
import { DbConfig, IUserRepository } from 'app-data-contracts';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';

const DEFAULT_DB_CONFIG = require('./db/config.json');



@suite class UserRepositoryTest {

    repository:UserRepository;

    before() { 
        this.repository = new UserRepository();
        this.repository.dbConfig = new DbConfig( DEFAULT_DB_CONFIG );
    }

    after() { }


    @test testFindUserbyId() {

         return this.repository.getById(1).then(data => {
            expect(data).to.be.an('object');
            expect(data).to.be.deep.eq({ id: 1, name: 'Hem' });
        });
    }


    @test testFindByName() {

        return this.repository.find('john', 1, 30)
            .then(data=> {
                expect(data).to.be.an('array');
                expect(data.length).to.equal(1);
                expect(data).to.be.deep.eq([ { id: 2, name: 'John' } ]);                
            });
    }


    
}