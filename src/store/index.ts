import { createStore } from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );


import rootReducer from './rootReducer.js'

// preloadedState will be passed in by the plugin
export default store => {
  return createStore(rootReducer, store);
};