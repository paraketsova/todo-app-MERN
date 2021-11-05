const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListsModel = new Schema({

  title: {
    type: String,
    required: true,
  },
  tasks: [{
    task: {
      type:String
    },
    completed: {
      type: Boolean,
      default: false,
    }
  }],
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },

});

const TodoLists = mongoose.model('todoItem', TodoListsModel);

module.exports = TodoLists;
