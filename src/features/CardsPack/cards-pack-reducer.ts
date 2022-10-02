import {Dispatch} from "redux";
import {cardPacksAPI, cardsAPI,} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {isAxiosError} from "../Registration/registration-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import {setForgottenEmailAC, setIsPasswordReset, setUserInfoAC} from "../Login/auth-reducer";

export type PacksInitialType = {
    cardPackData? : any//PackDataType | null
    cardsData? : CardDataType | null
}


const initialState :PacksInitialType = {
    cardPackData : null , //as PackDataType | null,
    cardsData : null as CardDataType |null
}


type CardPackType = {
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


type PackDataType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type CardsType = {
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

type CardDataType = {
    cards : CardsType[]
    packUserId: string
    packName: string
    packPrivate: false,
    packCreated: Date
    packUpdated : Date
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: 0,
    maxGrade: 6,
    token: string,
    tokenDeathTime: number
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

export const setCardPackDataAC = (data: PackDataType[]) => {
    return {type: "PACK/SET-PACK-DATA", data: data} as const
}
export const setCardsDataAC = (data: any) => {
    return {type: "CARDS/SET-CARDS-DATA", data: data} as const
}

//Thunk Creators

export const SetCardPackDataTC = (pageNumber:number,min?:number,max?:number,userId?:string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardPacksAPI.getCardPAcks(9,pageNumber, min , max , userId)
        if (res) {
            dispatch(setCardPackDataAC(res.data))

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