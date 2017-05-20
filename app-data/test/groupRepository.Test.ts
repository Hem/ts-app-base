import 'reflect-metadata';
import { GroupRepository } from '../src';
import { DbConfig, IGroupRepository, Group } from 'app-data-contracts';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';

const DEFAULT_DB_CONFIG = require('./db/config.json');

@suite class GroupRepositoryTest {

    repository:GroupRepository;

    before() { 
        this.repository = new GroupRepository();
        this.repository.dbConfig = new DbConfig( DEFAULT_DB_CONFIG );
    }

    after() { }


    @test testFindGroupById() {

         return this.repository.getById(1).then(data => {
            expect(data).to.be.an('object');
            expect(data).to.be.deep.eq({ id: 1, name: 'Administrators' });
        });
    }


    @test testFindGroupByName() {

        return this.repository.find('Admin', 1, 30)
            .then(data=> {
                expect(data).to.be.an('array');
                expect(data.length).to.equal(1);
                expect(data).to.be.deep.eq([ { id: 1, name: 'Administrators' } ]);                
            });
    }


    
}