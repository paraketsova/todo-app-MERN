const express = require('express');
const router = express.Router();

const todoItem = require('../models/todoModel')

router.get('/favicon.ico', async function (req, res) {
  res.send();
});

/*  READ all lists  */
router.get('/', async function (req, res, next) {
  const todoLists = await todoItem.find();
  res.json(todoLists);
});

/*  READ one list (with all its tasks)  */
router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  const todoList = await todoItem.findOne({ _id: id });
  res.json(todoList);
});

/*  ADD new list  */
router.post('/lists/add', async function (req, res, next) {
  console.log(req.body.newTitle);
  const newTitle = req.body.newTitle;
  const newList = await todoItem.create({
    title: newTitle,
    tasks: [],
    new: true
  });
  res.json(newList);
});

/*  ADD new task  */
router.post('/tasks/add/:id', async function (req, res, next) {
  console.log(req.body.newText, req.params.id);
  const id = req.params.id;
  const newText = req.body.newText;
  const { tasks } = await todoItem.findOne({ _id: id });
  tasks.push({
    text: newText,
    completed: false,
  });
  const newTodoList = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
    { new: true }
  );
  res.json(newTodoList);
});

/*  UPDATE list title  */
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

/*  UPDATE task text  */
router.put('/tasks/update/:id', async function (req, res, next) {
  const id = req.params.id;
  const newTaskText = req.body.newTaskText;
  const i = req.body.i;

  const { tasks } = await todoItem.findOne({ _id: id });
  tasks[i].text = newTaskText;

  const updatedTodotList = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
    { new: true }
  );
  res.json(updatedTodotList);
});

/*  UPDATE task status  */
router.put('/tasks/complete/:id', async function (req, res, next) {
  const id = req.params.id;
  const i = req.body.i;
  const newStatus = req.body.newStatus;

  const { tasks } = await todoItem.findOne({ _id: id });
  tasks[i].completed = newStatus;

  const updatedTodotList = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
    { new: true }
  );
  res.json(updatedTodotList);
});

/*  DELETE list  */
router.delete('/lists/delete/:id', async function (req, res, next) {
  const id = req.params.id;
  const deletedList = await todoItem.findOneAndDelete(
    { _id: id }
  );
  res.json(deletedList);
});

/*  DELETE task  */
router.delete('/tasks/delete/:id/', async function (req, res, next) {
  const id = req.params.id;
  const index = req.body.i;
  const { tasks } = await todoItem.findOne({ _id: id });
  const newTasks = tasks.splice(index, 1);
  const updateTodoList = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
    { new: true }
  );
  res.json(updateTodoList);
});

module.exports = router;
