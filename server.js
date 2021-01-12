// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 8080;
// const path = require("path");
// const fs = require("fs");
// const DB_PATH = path.join(__dirname, "./db/db.json");

// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/api/notes", function (req, res) {
//   try {
//     let DB = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

//     res.json(DB);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// app.post("/api/notes", (req, res) => {
//   try {
//     let DB = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

//     req.body.id = 0;

//     DB.push(req.body);

//     fs.writeFileSync(DB_PATH, JSON.stringify(DB));

//     res.json(req.body);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// app.delete("/api/notes/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   try {
//     let DB = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

//     // let new_DB = [];
//     // for(const note of DB){
//     //   if(note.id !== id) new_DB.push(note)
//     // }

//     // const index = DB.findIndex(note => note.id === id)
//     // DB.splice(index, 1);

//     DB = DB.filter(note => note.id !== id);

//     fs.writeFileSync(DB_PATH, JSON.stringify(DB));

//     res.json(req.body);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

// app.get("/notes", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/notes.html"));
// });

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// app.listen(PORT, function () {
//   console.log("http://localhost:" + PORT);
// });
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("./routes/apiRoutes")(app);
require("./routes/viewRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});