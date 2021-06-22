require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const notesRouter = require("./notes/notes.router");

const port = process.env.PORT || 3003;
const url = process.env.MONGO_URL;

module.exports = class notesServer {
  constructor() {
    this.server = null;
  }

  async start() {
    // Input start middlwares here
    this.initPort();
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    await this.initDatabase();
    this.startListening();
  }

  initServer() {
    this.server = express();
    console.log("server initialized");
  }

  initPort() {
    this.port = port;
    console.log("port initialized");
  }

  initMiddlwares() {
    this.server.use(express.json());
    this.server.use(morgan("dev"));
    this.server.use(cors());
    console.log("middlewares initialized");
  }

  initRoutes() {
    // input routers here
    this.server.use("/api/notes", notesRouter);
    console.log("routes initialized");
  }

  async initDatabase() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Database connection successful");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    console.log("DB initialized");
  }

  startListening() {
    this.server.listen(this.port, () => {
      console.log("Server started at PORT:", this.port);
    });
  }
};
