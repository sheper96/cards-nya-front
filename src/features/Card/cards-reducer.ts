import { Dispatch } from "redux"
import { cardsAPI, ResponseCardsType } from "../../app/api"
import { setAppStatusAC } from "../../app/app-reducer"
import { AppThunk } from "../../app/store"


export const initialState = {
    cardsData: {
        cards: [] as CardsType[],
        packUserId: '',
        packName: '',
        packPrivate: false,
        packCreated: new Date(),
        packUpdated: new Date(),
        page: 1,
        pageCount: 5,
        cardsTotalCount: 0,
        minGrade: 0,
        maxGrade: 6,
        token: '',
        tokenDeathTime: 0,
    } as CardDataType,
    params : {
        page: '1',
        pageCount: '5',
        cardPackId : ''
    } as CardsUrlType
}

export type CardsUrlType = {
    page?:string
    pageCount?:string
    cardPackId? : string
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

export type CardsActionType = ReturnType<typeof setCardsDataAC> |
    ReturnType<typeof setCardsUrlParamsAC>
export type InitialPackStateType = typeof initialState

export const cardsReducer = (state = initialState, action: CardsActionType):InitialPackStateType  => {

    switch (action.type) {
        case "CARDS/SET-CARDS-DATA":
            return {...state, cardsData: {...action.data}}
        case "CARDS/SET-CARDS-URL-PARAMS":
            return {...state, params: {...action.params}}
        default :
            return state
    }
}

//Action Creator

export const setCardsDataAC = (data: ResponseCardsType) => {
    return {type: "CARDS/SET-CARDS-DATA", data: data} as const
}
export const setCardsUrlParamsAC = (params: CardsUrlType) => {
    return {type: "CARDS/SET-CARDS-URL-PARAMS", params: params} as const
}

//Thunk Creator

export const SetCardDataTC = ():AppThunk => async (dispatch,getState) => {
    const urlParams = getState().cards.params
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards({...urlParams})
        if (res) {
            dispatch(setCardsDataAC(res.data))
        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const SetCardLearnDataTC = (packId:string |undefined):AppThunk => async (dispatch,getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards({cardPackId: packId, page: '1', pageCount: '100'})
        if (res) {
            dispatch(setCardsDataAC(res.data))
        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const addNewCardTC = (packId: string, question: string,answer:string) :AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await cardsAPI.addNewCard(packId, question,answer)
        dispatch(SetCardDataTC())
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const updateCardTC = (cardId: string, question: string, answer: string) :AppThunk=> async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.editCard(cardId, question, answer)
        dispatch(SetCardDataTC())
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}
export const deleteCardTC = (cardId: string) :AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.deleteCard(cardId)
        dispatch(SetCardDataTC())
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}





