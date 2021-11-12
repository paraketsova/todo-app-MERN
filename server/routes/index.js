const express = require('express');
const router = express.Router();

const todoItem = require('../models/todoModel')
const {NativeDate} = require('mongoose');

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
 const todoListNewTask = await todoItem.findOneAndUpdate(
   { _id: id },
   { tasks },
   { new: true }
 );
  res.json(todoListNewTask);
  console.log(todoListNewTask);
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

  const updateTaskTextList = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
    { new: true }
  );
  res.json(updateTaskTextList);
  console.log(updateTaskTextList);//TODO - add to client or delete
});

/*  UPDATE task status  */
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
    { new: true }
  );
  res.json(updateTaskStatus);
  console.log(updateTaskStatus);//TODO - add to client or delete
});

/*  DELETE list  */
router.delete('/lists/delete/:id', async function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  const deletedList = await todoItem.findOneAndDelete(
    { _id: id }
  );
  res.json(deletedList);
  console.log(deletedList);//TODO - add to client or delete
});

/*  DELETE task  */
router.delete('/tasks/delete/:id/', async function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  const index = req.body.i;
  console.log(index);
  const { tasks } = await todoItem.findOne({ _id: id });
  console.log("TASKS: " + tasks);
  const newTasks = tasks.splice(index, 1);
  console.log("NEWTASKS: " + tasks);

  const updateTasksList = await todoItem.findOneAndUpdate(
    { _id: id },
    { tasks },
    { new: true }
  );
  res.json(updateTasksList);
  console.log(updateTasksList);//TODO - add to client or delete
});

module.exports = router;
