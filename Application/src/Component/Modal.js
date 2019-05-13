import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  // we are creating a portal using ReactDOM, it takes two parameters, first is what to be shown and
  // second is the dom element on which this portal will be mounted
  return ReactDOM.createPortal(
    <div
      // we are adding an event hanlder for programmatic navigation
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
