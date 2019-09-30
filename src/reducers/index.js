import { combineReducers } from "redux";
import commentsReducers from './comments';

export default combineReducers({
    comments: commentsReducers
});