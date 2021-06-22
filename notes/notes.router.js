const { Router } = require("express");
const { addNote, currentNotes, deleteNote } = require("./notes.controller");

const notesRouter = Router();

notesRouter.post("/", addNote);
notesRouter.get("/current", currentNotes);
notesRouter.delete("/remove", deleteNote);

module.exports = notesRouter;
