import {AnyAction, applyMiddleware, combineReducers, createStore, Dispatch} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import { cardsPackReducer } from "../features/CardsPack/cards-pack-reducer";
import authReducer from "../features/Login/auth-reducer";
import profileReducer from "../features/Profile/profile-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
  profilePage : profileReducer,
  app: appReducer,
  auth:authReducer,
  cards:cardsPackReducer
})


export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = Dispatch<AnyAction> & ThunkDispatch<AppRootStateType, null, AnyAction>


// @ts-ignore
window.store = store;

