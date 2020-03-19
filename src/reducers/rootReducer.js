import { combineReducers } from "redux";
import auth from "./authReducer";
import login from "./loginReducer";
import signup from "./signupReducer";
import dashboard from './dashboardReducer'

export default combineReducers({
  auth,
  login,
  signup,
  dashboard,
});