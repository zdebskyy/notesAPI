const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const noteSchema = new Schema({
  title: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now },
});

noteSchema.statics.removeNote = removeNote;

async function removeNote(noteId) {
  return this.findByIdAndDelete(noteId);
}

const noteModel = mongoose.model("Note", noteSchema);

module.exports = noteModel;
