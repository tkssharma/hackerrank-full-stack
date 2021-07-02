var express = require('express');
var router = express.Router();
var tasksController = require('../controllers/tasks.controller');
var middleware = require('../middleware');

router
    .post('/',
        middleware('tasks.create'),
        tasksController.create)
    .get('/:id',
        middleware('tasks.getById'),
        tasksController.getById);

module.exports = router;
