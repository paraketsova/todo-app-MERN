const express = require('express');
const router = express.Router();

const todoItem = require('../models/todoModel')

router.get('/favicon.ico', async function (req, res) {
  res.send();
});

/*  READ all lists  */
router.get('/', async function (req, res) {
  const todoLists = await todoItem.find();

  if (!todoLists) {
    res.statusCode = 404;
    res.statusMessage = 'Not Found'
    res.end('Something wrong');
  } else {
    res.statusCode = 200;
    res.json(todoLists);
  }
});

/*  READ one list (with all its tasks)  */
router.get('/:id', async function (req, res) {
  const { id } = req.params;
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    //  Find TODOlist by Id
    const todoList = await todoItem.findOne({_id: id});

    if (!todoList) {
      res.statusCode = 404;
      res.statusMessage = 'Not Found'
      res.end('Not found');
    } else {
      res.statusCode = 200;
      res.json(todoList);
    }
  }
});

/*  ADD new list  */
router.post('/lists/add', async function (req, res) {
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
router.post('/tasks/add/:id', async function (req, res) {
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
router.put('/lists/update/:id', async function (req, res) {
  console.log(req.body.title, req.params.id);
  const id = req.params.id;
  const title = req.body.title;

  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    //  Find TODOlist and update its title
    const editedTodoList = await todoItem.findOneAndUpdate(
      { _id: id },
      { title },
      { new: true }
    );

    if (!editedTodoList) {
      res.statusCode = 404;
      res.statusMessage = 'List Not Found';
      res.end('List Not found');
    } else {
      res.statusCode = 200;
      res.json(editedTodoList);
    }
  }
});

/*  UPDATE task text  */
router.put('/tasks/update/:id', async function (req, res) {
  const id = req.params.id;
  const newTaskText = req.body.newTaskText;
  const i = req.body.i;

  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    //   Find TODOList in DB
    const { tasks } = await todoItem.findOne({_id: id});
    tasks[i].text = newTaskText;
    // Update one task's text in TODOlist
    const updatedTodoList = await todoItem.findOneAndUpdate(
      {_id: id},
      {tasks},
      {new: true}
    );

    if (!updatedTodoList) {
      res.statusCode = 404;
      res.statusMessage = 'List Not Found';
      res.end('List Not found');
    } else {
      res.statusCode = 200;
      res.json(updatedTodoList);
    }
  }
});

/*  UPDATE task status  */
router.put('/tasks/complete/:id', async function (req, res) {
  const id = req.params.id;
  const i = req.body.i;
  const newStatus = req.body.newStatus;

  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    // Find TODOList in DB
    const { tasks } = await todoItem.findOne({ _id: id });
    tasks[i].completed = newStatus;

    // Update one task in TODOlist and update the status
    const updatedTodoList = await todoItem.findOneAndUpdate(
      { _id: id },
      { tasks },
      { new: true }
    );

    if (!updatedTodoList) {
      res.statusCode = 404;
      res.statusMessage = 'List Not Found';
      res.end('List Not found');
    } else {
      res.statusCode = 200;
      res.json(updatedTodoList);
    }
  }
});

/*  DELETE list  */
router.delete('/lists/delete/:id', async function (req, res) {
  const id = req.params.id;
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    // Delete TODOlist from DB
    const deletedList = await todoItem.findOneAndDelete(
      {_id: id}
    );

    if (!deletedList) {
      res.statusCode = 404;
      res.statusMessage = 'Not Found'
      res.end('Not found');
    } else {
      res.statusCode = 200;
      res.json(deletedList);
    }
  }
});

/*  DELETE task  */
router.delete('/tasks/delete/:id/', async function (req, res) {
  const id = req.params.id;
  const index = req.body.i;
  if (!id) {
    res.statusCode = 500;
    res.statusMessage = 'Invalid id';
    res.end('Invalid id');
  } else {
    // Delete task from tasks' array
    const {tasks} = await todoItem.findOne({_id: id});
    const newTasks = tasks.splice(index, 1);
    const updatedTodoList = await todoItem.findOneAndUpdate(
      {_id: id},
      {tasks},
      {new: true}
    );

    if (!updatedTodoList) {
      res.statusCode = 404;
      res.statusMessage = 'List Not Found';
      res.end('List Not found');
    } else {
      res.statusCode = 200;
      res.json(updatedTodoList);
    }
  }
});

module.exports = router;
