const express = require('express');
const router = express.Router();
const TodoLists = require('../models/todoListsModel');

// function nameFilter(user, query) {         //
//   return user.toLowerCase().indexOf(query.toLowerCase()) != -1;
// }
//
// function searchUser(input) {
//   return lists.filter();
// }

router.get('/', async function (req, res, next) {
  const todoLists = await TodoLists.find();
  res.json(todoLists);
});

router.get('/favicon.ico', async function (req, res) {
  res.send();
});

router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  const todoList = await TodoLists.findOne({ _id: id });
  res.json(todoList);
});

// // -- POST ROUTES -- //
//
// router.post('/api/lists', function(req, res, next) {
//   lists.push(req.body);
//   res.json(lists);
// });
//
// router.post('/api/lists/:id', function(req, res, next) {
//
// });
//
// // -- UPDATE ROUTES -- //
//
//
// // -- DELETE ROUTES -- //
//
// router.delete('/api/lists/:id', function(req, res, next) {
//   //res.json(lists);
// });

module.exports = router;
