import React from "react";
// FLV is responsible for getting the streams of live videos and making it possible to display on the HTML5 video player
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    // refs are the ways to access dom elements created inside render method
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    // once again! this match.params is being procued by the React-Router-Dom, through the link,
    // we received all these cool properties
    this.props.fetchStream(id);
    // we will try to build player once the page loads
    this.buildPlayer();
  }

  // if we didn't run the build player at the inital didMount, we will try again in DidUpdate
  componentDidUpdate() {
    this.buildPlayer();
  }

  // some clean up
  // componentWillMount() {
  //   this.player.destroy();
  // }

  // handling the async
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    // initializing the FLV object
    this.player = flv.createPlayer({
      type: "flv",
      Url: `http://localhost/8000/live/${id}.flv`
    });
    // let's pass reference to our video element of our component
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    // If you come from python World. Object destructing is not a new thing for you...
    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Return an a stream Object which is the stream with the selected ID
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
