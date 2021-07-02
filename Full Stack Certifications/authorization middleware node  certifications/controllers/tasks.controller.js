module.exports = {
    create: function (req, res) {
        res.status(201).send();
    },

    getAll: function (req, res) {
        res.json([{id: 1, name: 'QA Test App'}]);
    },

    getById: function (req, res) {
        res.json({id: 1, name: 'QA Test App'});
    }
};
