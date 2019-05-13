import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from "./types";
import streams from "../apis/streams";
import history from "../history";

// getting user from google and setting as the action payload
export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

// action for signing out, this will embark on a reducer that will update the store eventually
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => {
  // making use of redux-thunk for async request
  return async (dispatch, getState) => {
    // getState is another function of reduxThunk that allows you to dissect particular poritons of the state
    const { userId } = getState().auth;
    //http://localhost:3001/streams
    const response = await streams.post("/streams", { ...formValues, userId });
    // manually dispatching to reducers, remember reponse.data is necessary, because data is what we are looking for! there are other
    // data available too on the request
    dispatch({ type: CREATE_STREAM, payload: response.data });
    // programmatic nagivation to get the user back to the root route
    history.push("/");
  };
};

// getting all the streams
export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// getting a specific stream
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// editing a stream
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  // programmatic navigation to get user back to the root route
  history.push("/");
};

// deleting a stream
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
