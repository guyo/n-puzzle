import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/rootReducer'
import logger from 'redux-logger'

export default function(preloadState) {
    const middlewares=[];

    // add log for debuging purposes 
    if (process.env.NODE_ENV !== "production") {
        middlewares.push(logger);
    }

    return createStore(rootReducer, preloadState, applyMiddleware(...middlewares));
}