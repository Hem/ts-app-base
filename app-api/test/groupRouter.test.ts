import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

import app from '../src/App';


@suite
export class GroupRouterTest {

    @test
    testGroupGetById() {

        return chai.request(app).get('/api/v1/groups/1')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res.type).to.eql('application/json');
                expect(res).to.be.json;
                expect(res.body).to.deep.eq({ id: 1, name: 'Administrators' });

            });
    }

}