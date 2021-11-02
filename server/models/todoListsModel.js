const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListsSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'User',
  },
});

const TodoLists = mongoose.model('todolists', TodoListsSchema);

module.exports = TodoLists;
