import {Dispatch} from "redux";
import {cardPacksAPI, cardsAPI,} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {isAxiosError} from "../Registration/registration-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import {setForgottenEmailAC, setIsPasswordReset, setUserInfoAC} from "../Login/auth-reducer";

export type PacksInitialType = {
    cardPackData?: PackDataType | null
    cardsData?: CardDataType 
}

export const initialState: PacksInitialType = {
    cardPackData: {} as PackDataType,
    cardsData: {
        cards: [] as CardsType[],
        packUserId: '',
        packName: '',
        packPrivate: false,
        packCreated: new Date(),
        packUpdated: new Date(),
        page: 1,
        pageCount: 0,
        cardsTotalCount: 0,
        minGrade: 0,
        maxGrade: 6,
        token: '',
        tokenDeathTime: 0,
    } as CardDataType
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

export type CardsType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

type CardDataType = {
    cards: CardsType[]
    packUserId: string
    packName: string
    packPrivate: false,
    packCreated: Date
    packUpdated: Date
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: 0,
    maxGrade: 6,
    token: string,
    tokenDeathTime: number
}

export type actionsType = ReturnType<typeof setCardPackDataAC> |
    ReturnType<typeof setCardsDataAC>


export const cardsPackReducer = (state = initialState, action: actionsType) => {

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

export const SetCardPackDataTC = (pageNumber: number, min?: number, max?: number, userId?: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardPacksAPI.getCardPAcks(9, pageNumber, min, max, userId)
        if (res) {
            dispatch(setCardPackDataAC(res.data))

        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const createNewPackTC = (packName:string, isPrivate:boolean) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
   
    try {
        const res = await cardPacksAPI.addCardPack(packName,isPrivate)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const deletePackTC = (packId:string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
   
    try {
        const res = await cardPacksAPI.deleteCardPack(packId)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const editPackTC = (packId:string,name:string,isPrivate:boolean) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
   
    try {
        const res = await cardPacksAPI.updateCardPack(packId,name,isPrivate)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

//Cards

export const SetCardDataTC = (id?: string) => async (dispatch: Dispatch) => {
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

export const addNewCardTC = (cardsPackId: string | undefined ,question:string,answer:string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.addNewCard(cardsPackId,question,answer)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const updateCardTC = (cardId: string  ,question:string,answer:string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.editCard(cardId,question,answer)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const deleteCardTC = (cardId: string ) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.deleteCard(cardId)
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

