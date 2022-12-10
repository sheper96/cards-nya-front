import {AppThunk} from "../../app/store";

import {setAppStatusAC} from "../../app/app-reducer";
import {PackDataType, PackType } from "./pack-reducer";
import { cardPacksAPI, ResponsePacksType } from "../../app/api";

const initialState= {
    packData: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 5,
        token: '',
        tokenDeathTime: 0,
    } as PackDataType,
    params: {
        page: '1',
        pageCount: '5',
        packName: '',
        userID: '',
        min: '0',
        max: '0'
    } as UrlParamsType,
}

export type PacksActionsType = ReturnType<typeof setPackDataAC> |
    ReturnType<typeof setUrlParamsAC> 

export const packsReducer2 = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    

        switch (action.type) {
        case "PACK/SET-PACK-DATA":
            return {...state, packData: {...action.data}}
        case "PACK/SET-URL-PARAMS":
            return {...state, params: {...action.params}}
        default :
            return state
        }
       
    
}


//action creators
export const setPackDataAC = (data: ResponsePacksType) => {
    return {type: "PACK/SET-PACK-DATA", data: data} as const
}

export const setUrlParamsAC = (params: UrlParamsType) => {
    return ({type: 'PACK/SET-URL-PARAMS', params:params} as const)
}



//thunks

export const setPacksTC = (): AppThunk => async (dispatch, getState) => {
    const urlParams = getState().packs2.params
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await cardPacksAPI.getPacks({...urlParams})
        if (res) {
            dispatch(setPackDataAC(res.data))
        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


//types
export type InitialPacksStateType = typeof initialState

export type UrlParamsType = {
    page?: string
    pageCount?: string
    packName?: string
    userID?: string
    min?: string
    max?: string
}