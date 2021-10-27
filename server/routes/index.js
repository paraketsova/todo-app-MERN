const express = require('express');
const router = express.Router();

const lists = [
  {
    'id': 1,
    'user': 'Max Olshansky',
    'title': 'Morning',
    'text': 'Wake up',
    'timestamp': Date.now()
  }
];

// function nameFilter(user, query) {         //ищем по подстроке имени юзера
//   return user.toLowerCase().indexOf(query.toLowerCase()) != -1;
// }
//
// function searchUser(input) {
//   return lists.filter();
// }

// -- GET ROUTES -- //
router.get('/api/lists', function(req, res, next) {
  console.log(req.query.query);
  res.json(lists.filter((list) => { return list.user.indexOf(req.query.query) !=-1; }));
});

router.get('/api/lists/:id', function(req, res, next) {
  res.json(lists);
});

// -- POST ROUTES -- //

router.post('/api/lists', function(req, res, next) {
  lists.push(req.body);
  res.json(lists);
});

router.post('/api/lists/:id', function(req, res, next) {

});

// -- UPDATE ROUTES -- //


// -- DELETE ROUTES -- //

router.delete('/api/lists/:id', function(req, res, next) {
  //res.json(lists);
});

module.exports = router;
