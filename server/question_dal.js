class Db {
  /**
   * Constructors an object for accessing questions in the database
   * @param mongoose the mongoose object used to create schema objects for the database
   */
  constructor(mongoose) {
    // This is the schema we need to store questions in MongoDB
    const questionSchema = new mongoose.Schema({
      question: String,
      comments: [
        {
          text: String,
          votes: Number
        }
      ]
    });

    // This model is used in the methods of this class to access questions
    this.questionModel = mongoose.model("question", questionSchema);
  }

  async getQuestions() {
    try {
      return await this.questionModel.find({});
    } catch (error) {
      console.error("getQuestions:", error.message);
      return {};
    }
  }

  async getQuestion(id) {
    try {
      return await this.questionModel.findById(id);
    } catch (error) {
      console.error("getQuestion:", error.message);
      return {};
    }
  }

  async createQuestion(newquestion) {
    // TODO: Error handling
    let question = new this.questionModel(newquestion);
    return question.save();
  }

  async addComment(id, comment) {
    const question = await this.getQuestion(id);
    comment.votes = 0;
    question.comments.push(comment);

    try {
      return question.save();
    } catch (error) {
      console.error("addComment:", error.message);
      return {};
    }
  }

  getComment(question, commentId) {
    try {
      return question.comments.find(comment => comment._id == commentId);
    } catch (error) {
      console.error("getComment:", error.message);
      return {};
    }
  }

  async vote(id, commentId) {
    // TODO: Error handling
    const question = await this.getQuestion(id);
    const comment = this.getComment(question, commentId);
    comment.votes = comment.votes + 1;

    return question.save();
  }

  /**
   * This method adds a bunch of test data if the database is empty.
   * @param count The amount of questions to add.
   * @returns {Promise} Resolves when everything has been saved.
   */
  async bootstrap(count = 10) {
    const comments = [
      { text: "Comment 1", votes: 0 },
      { text: "Comment 2", votes: 5 },
      { text: "Comment 3", votes: 8 }
    ];
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomName() {
      return [
        "What is React?",
        "How to make test case for Constructor",
        "How to modify android x86 system.img properly?",
        "Typescript - declare a generic method"
      ][getRandomInt(0, 3)];
    }

    function getRandomcomments() {
      const shuffled = comments.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, getRandomInt(1, shuffled.length));
    }

    let l = (await this.getQuestions()).length;
    console.log("question collection size:", l);

    if (l === 0) {
      let promises = [];

      for (let i = 0; i < count; i++) {
        let question = new this.questionModel({
          question: getRandomName(),
          comments: getRandomcomments()
        });
        promises.push(question.save());
      }

      return Promise.all(promises);
    }
  }
}

// We export the object used to access the questions in the database
module.exports = mongoose => new Db(mongoose);
