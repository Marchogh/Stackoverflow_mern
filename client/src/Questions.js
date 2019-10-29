import React, { Component } from "react";
import { Link } from "@reach/router";

class Questions extends Component {
  render() {
    return (
      <>
        <h1>All Questions</h1>
        <ol>
          {this.props.questions.map(question => (
            <div key={question._id} className="question-list">
              <li>
                <Link to={`/question/${question._id}`}>{question.name}</Link>
              </li>
            </div>
          ))}
        </ol>
      </>
    );
  }
}

export default Questions;
