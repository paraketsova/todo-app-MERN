const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListsSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  // content: {
  //   type: [Object],
  //   required: true
  // },
  // lastModifiedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // userId: {
  //   type: mongoose.ObjectId,
  //   required: true,
  // },
  text: {
    type: String,
  },
});

const TodoLists = mongoose.model('todolists', TodoListsSchema);

module.exports = TodoLists;
