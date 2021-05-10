const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const recipes = require('../recipes.json');
const should = chai.should();

chai.use(chaiHttp);

describe('express_recipes_routes', () => {

    it('Should return 400 for /recipes/step/:id if id is not valid',  (done) => {
        chai.request(server)
            .get('/recipes/step/asdasd')
            .then(response => {
                response.status.should.eql(400);
                response.text.should.eql('NOT_FOUND');
                done();
            })
    });


    it('Should respond with 0 if elapsed time is 0',  (done) => {
        chai.request(server)
            .get('/recipes/step/5?elapsedTime=0')
            .then(response => {
                response.status.should.eql(200);
                response.body.should.eql({index : 0});
                done();
            })
    });

    it('Should respond back with the correct step - 1',  (done) => {
        chai.request(server)
            .get('/recipes/step/4?elapsedTime=11')
            .then(response => {
                response.status.should.eql(200);
                response.body.should.eql({index : 0});
                done();
            })
    })

    it('Should respond back with the correct step - 2',  (done) => {
        chai.request(server)
            .get('/recipes/step/2?elapsedTime=9')
            .then(response => {
                response.status.should.eql(200);
                response.body.should.eql({index : 6});
                done();
            })
    })


});
