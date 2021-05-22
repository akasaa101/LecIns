import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";

let rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
