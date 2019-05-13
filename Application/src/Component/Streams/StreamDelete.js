import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  // if you ever wondered how we can pass JSX as props down the chain, this is the way! create a varibale, assign your JSX,
  // and call it to the prop
  renderActions() {
    // making our life easier
    const { id } = this.props.match.params;
    return (
      // in order to get around the need of REACT for enclosing parent divs which may break our UI, we make user of the
      // magical fragments. Not onl Fragments are invisible, but they let us have siblings elements together without any
      // broken UI. Tadaaa :)
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  // our helper method to produce text for the modal, this will also make sure that it only shows contents when they are loaded
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream ?";
    }
    return `Are you sure you want to delete this stream with the title: ${
      this.props.stream.title
    }`;
  }

  render() {
    return (
      <Modal
        // in order to make our Modal reuseable, we are passing the elements as props from parent to child
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

// again, if you ever wanted to use props from the component, you can add the second parameter OwnProps to MapStateToProps
const mapStateToProps = (state, ownProps) => {
  // and instead of this.props, put int ownProps
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
