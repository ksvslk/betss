import { createStore, applyMiddleware } from "redux";
import { appState } from "./reducer";
import thunk from 'redux-thunk';

export default createStore(appState, applyMiddleware(thunk))
