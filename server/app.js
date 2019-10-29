const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

/**** Configuration ****/
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan("combined")); // Log all requests to the console
app.use(express.static("../client/build")); // Only needed when running build in production mode

/**** Database ****/
// The "question Data Access Layer".
const questionDAL = require("./question_dal")(mongoose);

/**** Routes ****/
app.get("/api/questions", (req, res) => {
  // Get all questions. Put question into json response when it resolves.
  questionDAL.getQuestions().then(questions => res.json(questions));
});

app.get("/api/questions/:id", (req, res) => {
  let id = req.params.id;
  questionDAL.getQuestion(id).then(question => res.json(question));
});

app.post("/api/questions", (req, res) => {
  let question = {
    name: req.body.name,
    comments: [] // Empty comment array
  };
  questionDAL
    .createQuestion(question)
    .then(newquestion => res.json(newquestion));
});

app.post("/api/questions/:id/comments", (req, res) => {
  // To add a comment, you need the id of the question, and some comment text from the request body.
  questionDAL
    .addComment(req.params.id, req.body.comment)
    .then(updatedquestion => res.json(updatedquestion));
});

/**** Start ****/
const url = process.env.MONGO_URL || "mongodb://localhost/stackoverflow_db";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await questionDAL.bootstrap(); // Fill in test data if needed.
    await app.listen(port); // Start the API
    console.log(`question API running on port ${port}!`);
  })
  .catch(error => console.error(error));
