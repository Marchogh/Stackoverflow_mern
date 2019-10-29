class Db {
  /**
   * Constructors an object for accessing questions in the database
   * @param mongoose the mongoose object used to create schema objects for the database
   */
  constructor(mongoose) {
    // This is the schema we need to store questions in MongoDB
    const questionSchema = new mongoose.Schema({
      name: String,
      comments: [String], // A list of comments as string
      date: {
        type: Date,
        default: Date.now
      }
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

  async addComment(questionId, comment) {
    // TODO: Error handling
    const question = await this.getQuestion(questionId);
    question.comments.push(comment);
    return question.save();
  }

  /**
   * This method adds a bunch of test data if the database is empty.
   * @param count The amount of questions to add.
   * @returns {Promise} Resolves when everything has been saved.
   */
  async bootstrap(count = 10) {
    const comments = ["Comment 1", "Comment 2", "Comment 3", "Comment 4"];
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
          name: getRandomName(),
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
