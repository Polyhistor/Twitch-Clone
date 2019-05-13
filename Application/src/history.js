// we are going to user our own history object that will be maintained by the application rather than the browser history,
// this is due to overheads that browser router brings for programmatic navigation

// the history is a dependency of react-router-dom, so it comes automatically when you install react-router-dom
import createHistory from "history/createBrowserHistory";

// and that's it :)
export default createHistory();
