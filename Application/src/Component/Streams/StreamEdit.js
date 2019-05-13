import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";
// It is essential to consider that we do make user of two major context in this component in order
// to select user's id and match against our store. Redux keeps the ID of the users in the state, and the
// Router library that we have installed earlier, keeps track of the variable ID that user clicked on.
// then we can extract that ID from the props created by Router library, and then match it agasint the recrod
// in our state, and do the magic :)

class StreamEdit extends React.Component {
  componentDidMount() {
    // this match.params.id is being procued and hanled by the Router library, just console it
    // and you will see the structure of the object
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // the first time render occurs, we still don't have the stream! so make sure, that you do this check or
    // else you will have the can't get title of undefined error. Just follow my lead my child and you will
    // be a great JS coder...
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a stream</h3>
        {/* // bear in mind that initialValues is a very special property name inherently defined in ReduxForm, we can 
        // make use of it in order to set our initial values */}
        <StreamForm
          // #1 - the first set of paranthesis is to let JSX engine knows that we are doing javascript, the second is for creating an object
          // #2 - secondly, the object keys that we choose are the ones that we have chosen for our Form component Name attributes
          // once we set some initialValues, reduxForm will automatically check these keys against the Field names. Tricky, isn't it?
          // #3 the pick function of the Lodash library takes out what you need from the object
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// the trick is that, you can always have a second argument in mapStateToProps called 'ownProps' that will call
// the props from your component, this way you can get the data from the props and check it agains your data in the store.
const mapStateToProps = (state, ownProps) => {
  // this will select the appropriate stream
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
