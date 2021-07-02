const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Promise = require('bluebird');

chai.use(chaiHttp);

describe('express_authorization_middleware', () => {
    let agent;

    beforeEach(() => {
    });

    afterEach(() => {
        if (agent) {
            agent.close();
        }
    });


    it('Should send a 403 if the x-role header is not present', done => {
        chai.request(server)
            .get('/tasks/3')
            .then(response => {
                response.status.should.equal(403);
                done();
            })
    });

    it('Should send a 200 for a non-protected route', done => {
        chai.request(server)
            .get('/tasks')
            .then(response => {
                response.status.should.equal(200);
                done();
            })
    });

    it('Should send a 403 if the x-role value is invalid', done => {
        chai.request(server)
            .get('/tasks/3')
            .set('x-role', 'INVALID_ROLE')
            .then(response => {
                response.status.should.equal(403);
                done();
            })
    });

    it('Should send a 403 if the x-role value does not have access to route', done => {
        chai.request(server)
            .post('/tasks')
            .set('x-role', 'customer')
            .then(response => {
                response.status.should.equal(403);
                done();
            })
    });

    it('Should send a 201 if the x-role value has access to route', done => {
        chai.request(server)
            .post('/tasks')
            .set('x-role', 'admin')
            .then(response => {
                response.status.should.equal(201);
                done();
            })
    });


    it('Should validate header for protected routes', done => {
        agent = chai.request.agent(server);

        Promise.all([
            agent
                .get('/tasks/3')
                .set('x-role', 'admin'),
            agent
                .post('/tasks')
                .set('x-role', 'admin')
        ])
            .then(responseList => {
                responseList.forEach(response => {
                    response.status.should.match(/^20[0|1]/);
                });
                done();
            })
    });

    it('Should not require auth headers for unprotected routes', done => {
        agent = chai.request.agent(server);
        Promise
            .mapSeries([
                agent
                    .get('/tasks/3'),
                agent
                    .get('/'),
                agent
                    .post('/tasks')
            ], res => res)
            .then(responseList => {
                responseList.forEach((response, i) => {
                    if (i === 1) {
                        response.status.should.match(/^20[0|1]/);
                    } else {
                        response.status.should.eql(403);
                    }
                });
                done();
            })

    });
});
