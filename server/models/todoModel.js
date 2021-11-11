const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoListsModel = new Schema({
    title: {
      type: String,
      required: true,
    },
    tasks: [{
      text: {
        type:String
      },
      completed: {
        type: Boolean,
        default: false,
      }
    }],
  },
  { timestamps: true }
);

const TodoLists = mongoose.model('todoItem', TodoListsModel);

module.exports = TodoLists;
