import { createStore, applyMiddleware } from "redux";
import { appState } from "./reducer";
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

export default createStore(appState, applyMiddleware(logger, thunk))
