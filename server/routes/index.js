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
  const id = req.params.id;
  const newTaskText = req.body.newTaskText;
  const i = req.body.i;

  const { tasks } = await todoItem.findOne({ _id: id });
  tasks[i].text = newTaskText;

  const updateTaskText = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
// { lastModifiedAt: new Date() },
    { new: true }
  );
  res.json(updateTaskText);
  console.log(updateTaskText);
});

/* UPDATE task status */
router.put('/tasks/complete/:id', async function (req, res, next) {
  const id = req.params.id;
  const i = req.body.i;
  const newStatus = req.body.newStatus;
  console.log (id, i, newStatus);

  const { tasks } = await todoItem.findOne({ _id: id });
  tasks[i].completed = newStatus;

  const updateTaskStatus = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
// { lastModifiedAt: new Date() },
    { new: true }
  );
  res.json(updateTaskStatus);
  console.log(updateTaskStatus);
});

/* DELETE list */
router.delete('/lists/:id', function(req, res, next) {
});

/* DELETE task */
router.delete('/tasks/:id/:index', function(req, res, next) {
});

module.exports = router;
