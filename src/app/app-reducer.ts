import { Dispatch } from "redux";

import axios from "axios";
import {handleServerNetworkError} from "../common/utils/utils";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    modaltype: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try{
        debugger
    }catch (e){
        if (axios.isAxiosError(e)){
            handleServerNetworkError(e.message,dispatch)
        }
    }
    finally{
        dispatch(setAppInitializedAC(true))
    }
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null,
    modaltype: string | null,
    isInitialized : boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppModalTypeAC = (modaltype: string | null) => ({type: 'APP/SET-TYPE', modaltype} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedtionType = ReturnType<typeof setAppInitializedAC>
export type setAppType = ReturnType<typeof setAppModalTypeAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setAppInitializedtionType
    | setAppType
