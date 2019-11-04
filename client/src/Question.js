import React, { Component } from "react";
import { Link } from "@reach/router";
import PostComment from "./PostComment";

class Question extends Component {
  render() {
    const question = this.props.getquestion(this.props.id);

    let content = <p>Loading</p>;
    if (question) {
      content = (
        <>
          <h1 className="question-title">{question.question}</h1>
          <h3>Comments:</h3>
          <ul>
            {question.comments.map(c => (
              <div key={c._id}>
                <div className="comment">
                  <p className="votes">Votes: {c.votes}</p>
                  <button>
                    <span>&uarr;</span>
                  </button>
                  <button>
                    <span>&darr;</span>
                  </button>
                  <h3 className="comment-name">{c.text}</h3>
                </div>
              </div>
            ))}
          </ul>
          <PostComment
            id={this.props.id}
            postComment={(id, text) => this.props.postComment(id, text)}
          />
          <Link to="/">Back</Link>
        </>
      );
    }

    return content;
  }
}

export default Question;
