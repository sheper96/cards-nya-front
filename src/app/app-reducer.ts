import {Dispatch} from "redux"
import {setLogInAC, setUserInfoAC} from "../features/Login/auth-reducer";
import {authAPI} from "./api";
import { AppThunk } from "./store";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    modaltype: null,
    isInitialized: false,
   
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        case 'APP/SET-TYPE':
            return {...state, modaltype: action.modaltype}
      
        default:
            return {...state}
    }
}

export const initializeAppTC = (): AppThunk => async (dispatch:Dispatch) => {
    try {
        const res = await authAPI.authMe()
        dispatch(setLogInAC(true))
        dispatch(setUserInfoAC(res.data))
    } catch (e) {
    } finally {
        dispatch(setAppInitializedAC(true))
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null,
    modaltype: string | null,
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppModalTypeAC = (modaltype: string | null) => ({type: 'APP/SET-TYPE', modaltype} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedtionType = ReturnType<typeof setAppInitializedAC>
export type setAppType = ReturnType<typeof setAppModalTypeAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setAppInitializedtionType
    | setAppType


