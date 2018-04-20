import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { history } from '../utils/GetHistory';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../app/rootReducer';

const historyMiddleware = routerMiddleware(history);
const middleware = [thunk , historyMiddleware];
let environment = (process.env.NODE_ENV || 'development').toString().trim().toLowerCase();
//environment === 'development' && middleware.push(createLogger());

let initialState = { login :{error : false, formData: {}} };

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
);

export default store;
