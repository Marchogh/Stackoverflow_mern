import React, { Component } from "react";
import { Link } from "@reach/router";

class Question extends Component {
  render() {
    const question = this.props.getquestion(this.props.id);

    let content = <p>Loading</p>;
    if (question) {
      content = (
        <>
          <h1 className="question-title">{question.name}</h1>

          <h3>Comments</h3>
          <ul>
            {question.comments.map(c => (
              <li className="comment" key={c}>
                {c.name}
                {c.text}
                {c.upvote}
              </li>
            ))}
          </ul>
          <div className="post">
            <textarea rows="4" cols="50"></textarea>
            <button>Post Comment</button>
          </div>
          <Link to="/">Back</Link>
        </>
      );
    }

    return content;
  }
}

export default Question;
