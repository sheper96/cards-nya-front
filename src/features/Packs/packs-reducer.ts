import {AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
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

export const packsReducer = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    

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
    const urlParams = getState().packs.params
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


export const createNewPackTC = (packName: string, isPrivate: boolean) :AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardPacksAPI.addCardPack(packName, isPrivate)
        dispatch(setPacksTC())
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const deletePackTC = (packId: string) :AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardPacksAPI.deleteCardPack(packId)
        dispatch(setPacksTC())
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const editPackTC = (packId: string, name: string, isPrivate: boolean) :AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardPacksAPI.updateCardPack(packId, name, isPrivate)
        dispatch(setPacksTC())
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
    created: string,
    updated: string,
    more_id: string,
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
