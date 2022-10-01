import {Dispatch} from "redux";
import {cardPacksAPI, cardsAPI,} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {isAxiosError} from "../Registration/registration-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import {setForgottenEmailAC, setIsPasswordReset, setUserInfoAC} from "../Login/auth-reducer";

export type PacksInitialType = {
    cardPackData : PacksType[] | null
    cardsData : string | null
}


const initialState :PacksInitialType = {
  cardPackData : null as PacksType[] | null,
    cardsData : null
}

type PacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean,
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

type actionsType = ReturnType<typeof setCardPackDataAC> |
    ReturnType<typeof setCardsDataAC>


let cardsPackReducer = (state = initialState, action: actionsType) => {

    switch (action.type) {
        case "PACK/SET-PACK-DATA":
            return {...state, cardPackData: action.data} 
        case "CARDS/SET-CARDS-DATA":
            return {...state, cardsData: action.data}
        default :
            return state
    }
}

//Action Creators

export const setCardPackDataAC = (data: PacksType[]) => {
    return {type: "PACK/SET-PACK-DATA", data: data} as const
}
export const setCardsDataAC = (data: any) => {
    return {type: "CARDS/SET-CARDS-DATA", data: data} as const
}

//Thunk Creators

export const SetCardPackDataTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardPacksAPI.getCardPAcks()
        if (res) {
            dispatch(setCardPackDataAC(res.data.cardPacks))

        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

//Cards

export const SetCardDataTC = (id:string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards(id)
        if (res) {
            dispatch(setCardsDataAC(res.data))

        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export default cardsPackReducer;