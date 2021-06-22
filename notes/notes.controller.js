const noteModel = require("./notes.model");

class noteControllers {
  async addNote(req, res) {
    const { title, details } = req.body;

    const newNote = new noteModel({
      title,
      details,
    });

    await newNote.save();
    res.status(201).json(newNote);
  }

  async currentNotes(req, res) {
    const notes = await noteModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).json(notes);
  }

  async deleteNote(req, res) {
    const { id } = req.body;
    await noteModel.removeMovie(id);
    res.status(204).end();
  }
}

module.exports = new noteControllers();
