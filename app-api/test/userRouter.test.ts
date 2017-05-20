import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;


import app from '../src/App';



@suite
export class UserRouterTests {

    @test
    test_find_user_by_id_1() {

        return chai.request(app)
            .get('/api/v1/users/1')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
                expect(res).to.be.json;
                expect(res.body).to.deep.equal({ id: 1, name: 'Hem' });

            });
    }


    @test
    test_find_all_users() {

        return chai.request(app)
            .get('/api/v1/users')
            .then(res => {

                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                
            });

    }

}