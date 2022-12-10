import {Dispatch} from "redux";
import {cardPacksAPI, cardsAPI,} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import {setForgottenEmailAC, setIsPasswordReset, setUserInfoAC} from "../Login/auth-reducer";
import { AppThunk } from "../../app/store";

/*
export type PacksInitialType = {
    packData: PackDataType 
    params?: UrlParamsType 

}
*/

export const initialState = {
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

export type UrlParamsType = {
    page?: string,
    pageCount?: string,
    packName?: string,
    userID?: string,
    min?: string,
    max?: string
}

export type PackType = {
    _id: string
    user_id: string,
    user_name: string,
    private: false,
    name: string,
    path: string,
    grade: number
    shots: number
    deckCover: string,
    cardsCount: 0
    type: string
    rating: number
    created: Date,
    updated: Date,
    more_id: Date,
    "__v": number
}


export type PackDataType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number

}

export type PacksActionsType = ReturnType<typeof setPackDataAC> |
    ReturnType<typeof setUrlParamsAC2>

export type InitialPackStateType = typeof initialState

export const packReducer = (state = initialState, action: PacksActionsType)  => {

    switch (action.type) {
        case "PACK/SET-PACK-DATA":
            return {...state, packData: action.data}
        case "PACK/SET-URL-PARAMS":
            return {...state, params: {...action.params}}
        default :
            return state
    }
}

//Action Creators

export const setPackDataAC = (data: PackDataType[]) => {
    return {type: "PACK/SET-PACK-DATA", data: data} as const
}

export const setUrlParamsAC2 = (params: UrlParamsType) => {
    return {type: "PACK/SET-URL-PARAMS", params: params} as const
}


//Thunk Creators

export const SetPackDataTC = (pageNumber: number, min?: number, max?: number, userId?: string, packName?: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardPacksAPI.getCardPAcks(5, pageNumber, min, max, userId, packName)
        if (res) {
            dispatch(setPackDataAC(res.data))

        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createNewPackTC = (packName: string, isPrivate: boolean) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardPacksAPI.addCardPack(packName, isPrivate)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const deletePackTC = (packId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardPacksAPI.deleteCardPack(packId)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const editPackTC = (packId: string, name: string, isPrivate: boolean) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardPacksAPI.updateCardPack(packId, name, isPrivate)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
