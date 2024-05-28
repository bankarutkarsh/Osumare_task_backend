const express = require('express');

const taskcontroller = require('../Controllers/tasks');

const route = express.Router();

route.get('/tasks', taskcontroller.allTasks);
route.get('/task/:askedId', taskcontroller.getTaskById);
route.delete('/task/delete/:askedId', taskcontroller.deleteTask);
route.post('/tasks', taskcontroller.addTask);
route.put('/task/edit/:askedId', taskcontroller.editTask);

module.exports = route;