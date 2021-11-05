const express = require('express');
const router = express.Router();
const TodoLists = require('../models/todoListsModel');
const todoItem = require('../models/todoModel')


router.get('/', async function (req, res, next) {
  const todoLists = await todoItem.find();
  res.json(todoLists);
});

router.get('/favicon.ico', async function (req, res) {
  res.send();
});

router.get('/:id', async function (req, res, next) {
  const { id } = req.params;
  const todoList = await todoItem.findOne({ _id: id });
  res.json(todoList);
});

// // -- POST ROUTES -- //
//
// router.post('/api/lists', function(req, res, next) {
//   lists.push(req.body);
//   res.json(lists);
// });

// // -- UPDATE ROUTES -- //
/* PUT modify a specific todo-list */
// router.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const { title, contents } = req.body;
//
//   todoLists.findByIdAndUpdate(
//     _id,
//     {
//       title,
//       contents,
//       lastModifiedAt,
//       completed
//     },
//   )
//     .then((list) => {
//       res.json(list)
//     })
// })

//});
// // -- DELETE ROUTES -- //
//
// router.delete('/api/lists/:id', function(req, res, next) {
//   //res.json(lists);
// });

module.exports = router;
