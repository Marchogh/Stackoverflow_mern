import React, { Component } from "react";

class PostQuestion extends Component {
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
    this.props.postQuestion(this.state.input);
    document.getElementById("input-question").value = "";
  }

  render() {
    return (
      <>
        <h2>Post Question</h2>
        <div className="post">
          <textarea
            id="input-question"
            rows="4"
            cols="50"
            onChange={this.onChange}
          ></textarea>
          <button onClick={this.onClick}>Post Question</button>
        </div>
      </>
    );
  }
}

export default PostQuestion;
