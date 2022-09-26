import {Dispatch} from "redux";
import {authAPI, ForgotType, loginParamsType, UpdateUserNameType} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {isAxiosError} from "../Registration/registration-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";


export type signInType = {
    email: string,
    password: string,
    rememberMe: boolean,
    userInfo?: UserProfileType | null,
    forgottenEmail: string | null,
    isPasswordReset:boolean
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
type actionsType = ReturnType<typeof setUserInfoAC> |
    ReturnType<typeof setForgottenEmailAC> |
    ReturnType<typeof setIsPasswordReset> 

const initialState: signInType = {
    email: '',
    password: '',
    rememberMe: false,
    isPasswordReset:false,
    forgottenEmail: null as string | null,
    userInfo: null as UserProfileType | null,
}
let authReducer = (state = initialState, action: actionsType) => {

    switch (action.type) {
        case "AUTH/SET-USER-INFO":
            return {...state, userInfo: action.userInfo}
        case "AUTH/SET-FORGOTTEN-EMAIL":
            return {...state, forgottenEmail: action.forgottenEmail}
        case "AUTH/SET-RESET-PASSWORD":
            return {...state, isPasswordReset: action.isPasswordReset}
        default :
            return state
    }
}

//Action Creators

export const setUserInfoAC = (userProfile: UserProfileType) => {
    return {type: "AUTH/SET-USER-INFO", userInfo: userProfile} as const
}
export const setForgottenEmailAC = (forgottenEmail: string) => {
    return {type: "AUTH/SET-FORGOTTEN-EMAIL", forgottenEmail:forgottenEmail} as const
}
export const setIsPasswordReset = (isPasswordReset: boolean) => {
    return {type: "AUTH/SET-RESET-PASSWORD", isPasswordReset:isPasswordReset} as const
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

export const updateUserInfoTC = (data: UpdateUserNameType) => async (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.updateName(data)
        dispatch(setUserInfoAC(res.data.updatedUser))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const forgotPasswordTC = (data: ForgotType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.forgotPassword(data)
        dispatch(setForgottenEmailAC(data.email))
        dispatch(setIsPasswordReset(true))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export default authReducer;