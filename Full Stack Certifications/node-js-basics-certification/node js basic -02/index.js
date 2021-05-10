const OrderProcessor = require('./processor');

const orderProcessor = new OrderProcessor();

orderProcessor.on('PROCESSING_STARTED', (orderNumber) => {
    console.log(`Pre Order Checks Running for ${orderNumber}`)
});

orderProcessor.on('PROCESSING_FAILED', (failureData) => {
    console.log(`Failed Order`);
    console.log(`- OrderNumber: ${failureData.orderNumber}`);
    console.log(`- Reason: ${failureData.reason}`);
    console.log(`- ItemId: ${failureData.itemId}`);
})

orderProcessor.on('PROCESSING_SUCCESS', (orderNumber) => {
    console.log(`Pre Order Checks Passed for ${orderNumber}`)
})

orderProcessor.placeOrder({
    orderNumber: 'OD2323',
    lineItems: [
        {
            itemId: 3,
            quantity: 4
        },
        {
            itemId: 5,
            quantity: 4
        }
    ]
});


orderProcessor.placeOrder({
    orderNumber: 'OD2324',
    lineItems: [
        {
            itemId: 2,
            quantity: 1
        },
        {
            itemId: 0,
            quantity: 1
        }
    ]
});



