const express = require('express');
const router = express.Router();

const todoItem = require('../models/todoModel')

router.get('/favicon.ico', async function (req, res) {
  res.send();
});

/* READ all lists */
router.get('/', async function (req, res, next) {
  const todoLists = await todoItem.find();
  res.json(todoLists);
});

/* READ one list (with all its tasks) */
router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  const todoList = await todoItem.findOne({ _id: id });
  res.json(todoList);
});

/* ADD new list */
router.post('/lists/add', (req, res) => {
});

/* ADD new task */
router.post('/tasks/add', (req, res) => {
});

/* Modify list title */
router.put('/lists/update/:id', async function (req, res, next) {
  console.log(req.body.title, req.params.id);
  const id = req.params.id;
  const title = req.body.title;
  const editedTodoList = await todoItem.findOneAndUpdate(
    { _id: id },
    { title },
    { new: true }
  );
  res.json(editedTodoList); //TODO - add to client or delete
});

/* UPDATE task text */
router.put('/tasks/update/:id', async function (req, res, next) {
  console.log(req.params.id);
  console.log(req.body.newTaskText);
  console.log(req.body.i);
  const id = req.params.id;
  newTaskText = req.body.newTaskText;
  i = req.body.i;
  // const taskText = tasks[i].task;
  const foundList = await todoItem.findOne(
    { _id: id },
    // { tasks[i].task: newTaskText},
    { new: false }
  );
  // res.json(foundTodoTasks); //TODO - add to client or delete
  console.log(foundList);
  // const updateTodoTask =

});

/* UPDATE task status */
router.put('/tasks/complete', (req, res) => {
});

/* DELETE list */
router.delete('/lists/:id', function(req, res, next) {
});

/* DELETE task */
router.delete('/tasks/:id/:index', function(req, res, next) {
});

module.exports = router;
