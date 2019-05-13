import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  // we don't call events here! in redux Form, we just pass in form Values
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div>
        {/* for increase code reuseability, we are passing the values from this component to StreamForm component,
        that will handle the request */}
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  // map DispatchtoProps
  { createStream }
)(StreamCreate);
