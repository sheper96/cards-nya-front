import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../features/Login/login-reducer";
import profileReducer from "../features/Profile/profile-reducer";
import registrationPageReducer from "../features/Registration/registration-reducer";

const rootReducer = combineReducers({
  profilePage : profileReducer,
  loginPage : loginReducer,
  registrationPage : registrationPageReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))


// @ts-ignore
window.store = store;

