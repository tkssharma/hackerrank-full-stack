const chai = require('chai');
const OrderProcessor = require('../processor');
const should = chai.should();
const sinon = require('sinon');


describe('order_processor', () => {
    let orderProcessor;

    beforeEach(() => {
        orderProcessor = new OrderProcessor();
    });

    afterEach(() => {
        orderProcessor.removeAllListeners();
    });

    it('Should have all the method placeOrder in the class', () => {
      console.log(orderProcessor);
        ['placeOrder']
            .forEach(method => {
                orderProcessor.should.have.property(method);
            })
    });

    it('Should emit the event PROCESSING_STARTED when placeOrder is called', (done) => {
        const onStartedSpy = sinon.spy();

        orderProcessor.on('PROCESSING_STARTED', onStartedSpy);
        orderProcessor.placeOrder({
            orderNumber : "DUMMY",
            lineItems : []
        });

        setTimeout(() => {
            onStartedSpy.callCount.should.eql(1);
            onStartedSpy.getCall(0).args[0].should.eql("DUMMY");
            done();
        }, 20);
    });

    it('Should emit the PROCESSING_FAILED if line items are empty', (done) => {
        const onStartedSpy = sinon.spy();
        const onFailedSpy = sinon.spy();

        orderProcessor.on('PROCESSING_STARTED', onStartedSpy);
        orderProcessor.on('PROCESSING_FAILED', onFailedSpy);
        orderProcessor.placeOrder({
            orderNumber : "DUMMY",
            lineItems : []
        });

        setTimeout(() => {
            onStartedSpy.getCall(0).args[0].should.eql('DUMMY');
            onStartedSpy.callCount.should.eql(1);

            onFailedSpy.callCount.should.eql(1);
            const errorObject = onFailedSpy.getCall(0).args[0];
            errorObject.orderNumber.should.eql('DUMMY');
            errorObject.reason.should.eql('LINEITEMS_EMPTY');
            done();
        }, 20);

    });

    it.only('Should emit the PROCESSING_FAILED if any of the line items do not meet the stock requirements', (done) => {
        const onFailedSpy = sinon.spy();

        orderProcessor.on('PROCESSING_FAILED', onFailedSpy);
        orderProcessor.placeOrder({
            orderNumber : "OD1223",
            lineItems : [
                {
                    itemId: 2,
                    quantity: 1
                },
                {
                    itemId: 0,
                    quantity: 5
                }
            ]
        });

        setTimeout(() => {
            onFailedSpy.callCount.should.eql(1);
            const errorObject = onFailedSpy.getCall(0).args[0];
            errorObject.orderNumber.should.eql('OD1223');
            errorObject.reason.should.eql('INSUFFICIENT_STOCK');
            errorObject.itemId.should.eql(0);
            done();
        }, 20);
    });

    it('Should emit the PROCESSING_SUCCESS if all the validations pass', (done) => {
        const onSuccessSpy = sinon.spy();

        orderProcessor.on('PROCESSING_SUCCESS', onSuccessSpy);
        orderProcessor.placeOrder({
            orderNumber : "OD12233",
            lineItems : [
                {
                    itemId: 2,
                    quantity: 1
                },
                {
                    itemId: 5,
                    quantity: 3
                },
                {
                    itemId: 1,
                    quantity: 11
                }
            ]
        });

        setTimeout(() => {
            onSuccessSpy.callCount.should.eql(1);
            onSuccessSpy.getCall(0).args[0].should.eql('OD12233');
            done();
        }, 20);
    });

    it('Should emit the PROCESSING_SUCCESS if all the validations pass for multiple orders', (done) => {
        const onSuccessSpy = sinon.spy();

        orderProcessor.on('PROCESSING_SUCCESS', onSuccessSpy);
        orderProcessor.placeOrder({
            orderNumber : "OD12233",
            lineItems : [
                {
                    itemId: 2,
                    quantity: 1
                },
                {
                    itemId: 5,
                    quantity: 3
                },
                {
                    itemId: 1,
                    quantity: 11
                }
            ]
        });

        orderProcessor.placeOrder({
            orderNumber : "OD12234",
            lineItems : [
                {
                    itemId: 1,
                    quantity: 1
                }
            ]
        });

        setTimeout(() => {
            onSuccessSpy.callCount.should.eql(2);
            onSuccessSpy.getCall(0).args[0].should.eql('OD12233');
            onSuccessSpy.getCall(1).args[0].should.eql('OD12234');
            done();
        }, 20);
    });




});
