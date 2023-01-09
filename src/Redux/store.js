// we used combineReducers() to combine 2 reducers into one. Let’s import it, and pass it to createStore()

import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";

// const middleware = [thunk];

const store = createStore(
  reducers,
  {},
  // composeWithDevTools(applyMiddleware(...middleware))
  applyMiddleware(thunk)
);

export default store;