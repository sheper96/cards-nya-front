import {Dispatch} from "redux";
import {authAPI, loginParamsType, UpdateUserNameType} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {isAxiosError} from "../Registration/registration-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";


export type signInType = {
    email: string,
    password: string,
    rememberMe: boolean,
    userInfo?: UserProfileType | null
}
type MyExpectedResponseType = {
    error: string;
};
export type UserProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; 
    rememberMe: boolean;
    error?: string;
}
type setUserInfoActionCreator = ReturnType<typeof setUserInfoAC>
type actionsType = setUserInfoActionCreator

const initialState: signInType = {
    email: '',
    password: '',
    rememberMe: false,
    userInfo: null as UserProfileType | null
}
let authReducer = (state = initialState, action: actionsType) => {

    switch (action.type) {
        case "AUTH/SET-USER-INFO":
            debugger
            return {...state, userInfo: action.userInfo}

        default :
            return state
    }
}

//Action Creators

export const setUserInfoAC = (userProfile: UserProfileType) => {
    debugger
    return {type: "AUTH/SET-USER-INFO", userInfo: userProfile} as const
}

//Thunk Creators

export const loginTC = (data: loginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res) {
            dispatch(setUserInfoAC(res.data))
            dispatch(setAppInitializedAC(true))
        }
    } catch (error: unknown) {
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppInitializedAC(false))
        if (isAxiosError<MyExpectedResponseType>(error)) {
            if (error.response?.data.error) {
                handleServerNetworkError(error.response?.data.error, dispatch)

                dispatch(setAppErrorAC('some error'))
            } else {
                handleServerNetworkError(error.message, dispatch)
            }
        }
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.logOut()
        dispatch(setAppInitializedAC(false))
        console.log(res)
    } catch (error: unknown) {
    }
}

export const updateUserInfoTC = (data: UpdateUserNameType ) => async (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.updateName(data)
        dispatch(setUserInfoAC(res.data.updatedUser))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export default authReducer;