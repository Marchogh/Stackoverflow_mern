import React, { Component } from "react";
import { Router } from "@reach/router";
import "./style.css";
import Nav from "./Nav";
import Question from "./Question";
import Questions from "./Questions";

class App extends Component {
  // API url from the file '.env' OR the file '.env.development'.
  // The first file is only used in production.
  API_URL = process.env.REACT_APP_API_URL;

  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    // Get everything from the API
    this.getData();
  }

  async getData() {
    let url = `${this.API_URL}/questions`; // URL of the API.
    let result = await fetch(url); // Get the data
    let json = await result.json(); // Turn it into json

    return this.setState({
      // Set it in the state
      questions: json
    });
  }

  getQuestion(id) {
    // Find the relevant question by id
    return this.state.questions.find(q => q._id === id);
  }

  // method for posting a question
  async postQuestion(question) {
    this.postData(question);
  }

  // the above method calls this method for the post request
  async postData(question) {
    let url = `${this.API_URL}/questions`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        question: question
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => {
        this.getData();
      });
  }

  // post new comments
  postComment(id, text) {
    let url = `${this.API_URL}/questions/${id}/comments/`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        text: text
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(() => {
        this.getData();
      });
  }

  // Not working - Ther API is working so a PUT call will work.
  async vote(id, commentId) {
    let url = `${this.API_URL}/questions/${id}/comments/${commentId}/vote`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(() => {
        this.getData();
      });
  }

  // Not working
  handleVote(id, commentId) {
    this.vote(id, commentId);
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <Nav />
        </div>
        <div className="question-wrapper">
          <Router>
            <Question
              path="/question/:id"
              getquestion={id => this.getQuestion(id)}
              handleVote={(id, commentId) => this.handleVote(id, commentId)}
              postComment={(id, text) => this.postComment(id, text)}
            />
            <Questions
              path="/"
              questions={this.state.questions}
              postQuestion={question => this.postQuestion(question)}
            />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
