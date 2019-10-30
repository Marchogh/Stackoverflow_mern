import React, { Component } from "react";

class PostQuestion extends Component {
  render() {
    return (
      <>
        <div className="post">
          <textarea rows="4" cols="50"></textarea>
          <button>Post Question</button>
        </div>
      </>
    );
  }
}

export default PostQuestion;
