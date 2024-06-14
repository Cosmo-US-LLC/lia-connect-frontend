import messageReducer from '../store/slices/createJob/index'
import { combineReducers } from "redux";
const reducers = combineReducers({
    message:messageReducer
});

export default reducers;
