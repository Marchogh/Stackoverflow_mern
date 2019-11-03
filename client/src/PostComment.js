import React, { Component } from "react";

class PostComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  onClick() {
    this.props.postComment(this.state.input);
  }

  render() {
    return (
      <>
        <div className="post">
          <textarea rows="4" cols="50" onChange={this.onChange}></textarea>
          <button onClick={this.onClick}>Post Comment</button>
        </div>
      </>
    );
  }
}

export default PostComment;
