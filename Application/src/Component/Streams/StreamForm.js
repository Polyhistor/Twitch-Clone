import React from "react";
// let's get a component and a function from the redux-form library
// bear in mind that Field is a component and that's why it starts with capital
// whereas reduxForm is just a function, we will use.
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  // we destruct error and touched from meta object, and gloriously handle error in this function
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // Field component captures and returns component
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    // we take out all the input properties here
    return (
      <div className={className}>
        <label> {label} </label>
        <input {...input} autoComplete="off" />
        {/* the error propety comes from the meta object. the error property is previously populated by the validate function, 
        and has been fed to redux-form */}
        {this.renderError(meta)}
      </div>
    );
  };

  // we don't call events here! in redux Form, we just pass in form Values
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        // handleSubmit is an internal function of redux form that automatically calls preventDefault and helps with form submitting
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* The field component does not know anything to render, you need to help it using 'component' property */}
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// this is where we validate the form, again by getting the data that redux-form collects for us
const validate = formValues => {
  // creating and object and populating it with list of errors
  const error = {};
  if (!formValues.title) {
    error.title = "You must enter a title";
  }
  // redux will check the name of the Field and then check the errors object, if the Field has the same name as the errors object prop,
  // then redux form will take that error message and will pass it to our renderInput function, or input generator function
  if (!formValues.description) {
    error.description = "you must enter a description";
  }
  return error;
};

//instead of connect, we use reduxForm, this will add all the form functions into our props
export default reduxForm({
  // you're gonna name your form here
  form: "streamForm",
  // this is how we add validation function to redux-form
  validate: validate
})(StreamForm);
