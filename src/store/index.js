import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user.reducer";
import reducer from "../store/reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
