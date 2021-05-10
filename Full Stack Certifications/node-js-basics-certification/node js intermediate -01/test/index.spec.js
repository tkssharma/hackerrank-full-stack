const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const BlueBird = require('bluebird');
const Products = require('../models/products');

chai.use(chaiHttp);

const setup = (...products) => {
    return BlueBird.mapSeries(products, user => {
        return chai.request(server)
            .post('/products')
            .send(user)
            .then(response => {
                return response.body;
            })
    })
}

describe('products_api_medium', () => {
    const product_1 = {
        "name": "Premium Roast Coffee",
        "price": 1.19,
        "mrp": 1.19,
        "stock": 1
    }

    const product_2 = {
        "name": "Egg Meal",
        "price": 5.29,
        "mrp": 4.29,
        "stock": 1
    }

    const product_3 = {
        "name": "Hash Browns",
        "price": 1.19,
        "mrp": 1.19,
        "stock": 0,
        "isPublished": true
    }

    const product_4 = {
        "name": "Hazelnut Latte",
        "price": 2.29,
        "mrp": 2.28,
        "stock": 0
    }


    beforeEach(async () => {
        await Products.sync();
    })

    afterEach(async () => {
        await Products.drop();
    })

    it('should create a new product', async () => {
        const response = await chai.request(server).post('/products').send(product_1)
        response.should.have.status(201);
        delete response.body.id;
        response.body.should.eql({...product_1, isPublished: false})
    });

    it('should create a new products without the published field', async () => {
        const response = await chai.request(server).post('/products').send(product_3)
        response.should.have.status(201);
        delete response.body.id;
        response.body.should.eql({...product_3, isPublished: false})
    });

    it('should fetch all the products', async () => {
        const results = await setup(product_1, product_2, product_3, product_4);
        const response = await chai.request(server).get('/products')
        response.should.have.status(200);
        response.body.should.eql(results);
    })

    it('should fetch no products if there are not products stored', async () => {
        const response = await chai.request(server).get('/products')
        response.should.have.status(200);
        response.body.should.eql([]);
    })


    it('should publish the product if all the constraints are met', async () => {
        const results = await setup(product_1, product_2, product_3, product_4);
        const response = await chai.request(server).patch('/products/1').send({isPublished: true})
        response.should.have.status(204);
    })

    it('should publish the product and the data should be updated in the DB', async () => {
        const results = await setup(product_1, product_2, product_3, product_4);
        const response = await chai.request(server).patch('/products/1').send({isPublished: true})
        response.should.have.status(204);
        const getResponse = await chai.request(server).get('/products')
        const updatedProduct = getResponse.body.find(product => product.id === 1);
        updatedProduct.should.not.be.undefined;
        updatedProduct.isPublished.should.eql(true);
    })

    it('should get 422 when MRP is less the price of the product', async () => {
        const results = await setup(product_1, product_2, product_3, product_4);
        const response = await chai.request(server).patch('/products/2').send({isPublished: true})
        response.should.have.status(422);
        response.body.should.eql(['MRP should be less than equal to the Price'])
    })

    it('should get 422 when stock of the product is 0', async () => {
        const results = await setup(product_1, product_2, product_3, product_4);
        const response = await chai.request(server).patch('/products/3').send({isPublished: true})
        response.should.have.status(422);
        response.body.should.eql(['Stock count is 0'])
    })

    it('should get 422 when both  MRP is less the price of the product and stock of the product is 0', async () => {
        const results = await setup(product_1, product_2, product_3, product_4);
        const response = await chai.request(server).patch('/products/4').send({isPublished: true})
        response.should.have.status(422);
        response.body.length.should.eql(2);
        response.body.should.eql(['MRP should be less than equal to the Price', 'Stock count is 0'])
    })

    it('should get 405 for a put request to /products/:id', async () => {
        const [product] = await setup(product_1);
        const response = await chai.request(server).put(`/products/${product.id}`).send(product)
        response.should.have.status(405);
    })

    it('should get 405 for a delete request to /products/:id', async () => {
        const [product] = await setup(product_1);
        const response = await chai.request(server).delete(`/products/${product.id}`)
        response.should.have.status(405);
    })
});
