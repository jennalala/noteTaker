const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/db.json");
const util = require("util");
const writeFileSync = util.promisify(fs.writeFile);
const readFile = fs.readFile;

module.exports = (app) => {

  app.get("/api/notes", (req, res) => {
    readFile("./db/db.json", (error , data) => {
      let db = JSON.parse(data);
     if (error) throw console.log(error);
     res.json(db);
    });
  });

  app.post("/api/notes", (req, res) => {
    // console.log(db);
    let note = req.body;
    // console.log(note);
    let id = uuidv4();
    note.id = id;
    // console.log(db);
    db.push(note);
    writeFileSync("./db/db.json", JSON.stringify(db))
      .then(() => {
        res.json(note);
      })
      .catch((err) => console.error(err));
  });

  app.delete("/api/notes/:id", (req, res) => {
 
   readFile("./db/db.json", (error , data) => {
     let db = JSON.parse(data);
    let newNote = db.filter((note) => note.id != req.params.id);
    console.log(newNote);
    const updateNote = newNote;
    writeFileSync("./db/db.json", JSON.stringify(updateNote))
      .then(() => {
        res.json(updateNote);
      })
      .catch((err) => {
        console.error(err);
      });
   });
    
  });
};