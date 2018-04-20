import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import homeReducer from './components/landing/Home/Reducers';


const allReducers = combineReducers({
    routing: routerReducer,
    home: homeReducer,
});

export default allReducers;