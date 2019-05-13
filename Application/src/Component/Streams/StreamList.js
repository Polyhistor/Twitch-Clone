import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  // the best place to load the inital state from an API
  componentDidMount() {
    this.props.fetchStreams();
  }

  // helper method to see if the buttons should be visible to users
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          {/* we are doing URL based selection here for the edit, and the ID will be the variable that's added
          to the end of URL */}
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    // iterating over the state and pringint out streams
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {/* #1 in here helper function will be called with the given stream we are iterating over,
          checks if the ID is the same, and shows contents accordingly */}
          {/* #2 renderAdmin is being called merely for the purposes of better styling */}
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {/* navigating user to the relevant stream */}
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  // our create stream function using auth2 isSignedIn() method
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    // we need to make sure that the component knows the userId, here we are extracting the userId from the store
    currentUserId: state.auth.userId,
    // we need isSignedIn for validation. This validation will be used to conditionally show create Stream
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  // if you do have a named export, make sure you apply the braces in your mapDispatchToProps too
  { fetchStreams }
)(StreamList);
