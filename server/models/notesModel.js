const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  lastModifiedAt: {
    type: Date,
    required: true,
  },
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;