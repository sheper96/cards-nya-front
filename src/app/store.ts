import {AnyAction, applyMiddleware, combineReducers, createStore, Dispatch, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CardsActionType, cardsReducer } from "../features/Card/cards-reducer";
import {CardsPackActionsType, cardsPackReducer } from "../features/CardsPack/cards-pack-reducer";
import authReducer, { AuthActionsType } from "../features/Login/auth-reducer";
import {PacksActionsType, packsReducer } from "../features/Packs/packs-reducer";
import profileReducer from "../features/Profile/profile-reducer";
import {AppActionsType, appReducer} from "./app-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth:authReducer,
  packs:packsReducer,
  cards:cardsReducer
})


export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// типизация state

// все типы экшенов для всего приложения
export type AppRootActionsType = AppActionsType | AuthActionsType | CardsPackActionsType |PacksActionsType |CardsActionType

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// типизация dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>


// @ts-ignore
window.store = store;

