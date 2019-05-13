import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./Streams/StreamCreate";
import StreamEdit from "./Streams/StreamEdit";
import StreamDelete from "./Streams/StreamDelete";
import StreamShow from "./Streams/StreamShow";
import StreamList from "./Streams/StreamList";
import Header from "../Component/Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      {/* we are now using plain Router instead of Browser Router */}
      <Router history={history}>
        <Header />
        {/* switch looks at all the routes and only shows one Route, this way we can handle our conflicting routes issues */}
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          {/* :id allows for inserting variable, now if the user goes to Streams/edit/'anything' we will show the edit component */}
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/:id" exact component={StreamShow} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
