import {AnyAction, applyMiddleware, combineReducers, createStore, Dispatch} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import loginReducer from "../features/Login/login-reducer";
import authReducer from "../features/Profile/auth-reducer";
import profileReducer from "../features/Profile/profile-reducer";
import registrationPageReducer from "../features/Registration/registration-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
  profilePage : profileReducer,
  loginPage : loginReducer,
  registrationPage : registrationPageReducer,
  app: appReducer,
  auth:authReducer
})


export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<AppRootStateType, null, AnyAction>


// @ts-ignore
window.store = store;

