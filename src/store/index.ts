import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
const middleware = [thunk];
export let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);