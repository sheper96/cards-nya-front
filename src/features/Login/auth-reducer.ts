import {Dispatch} from "redux";
import {authAPI, ForgotType, loginParamsType, SetNewPasswordType, UpdateUserNameType} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import axios, { AxiosError } from "axios";

export type signInType = {
    email: string,
    password: string,
    rememberMe: boolean,
    isLoggedIn: boolean,
    userInfo?: UserProfileType | null,
    forgottenEmail: string | null,
    isPasswordReset: boolean
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

type registerParamsType = {
    email: string,
    password: string
}

export function isAxiosError<ResponseType>(error: unknown): error is AxiosError<ResponseType> {
    return axios.isAxiosError(error);
}

export type AuthActionsType = ReturnType<typeof setUserInfoAC> |
    ReturnType<typeof setForgottenEmailAC> |
    ReturnType<typeof setIsPasswordReset> |
    ReturnType<typeof setLogInAC>

const initialState: signInType = {
    email: '',
    password: '',
    rememberMe: false,
    isLoggedIn: false,
    isPasswordReset: false,
    forgottenEmail: null as string | null,
    userInfo: null as UserProfileType | null,
}
let authReducer = (state = initialState, action: AuthActionsType) => {

    switch (action.type) {
        case "AUTH/SET-USER-INFO":
            return {...state, userInfo: action.userInfo}
        case "AUTH/SET-FORGOTTEN-EMAIL":
            return {...state, forgottenEmail: action.forgottenEmail}
        case "AUTH/SET-RESET-PASSWORD":
            return {...state, isPasswordReset: action.isPasswordReset}
        case 'AUTH/SET-LOGGED_IN_OUT':
            return {...state, isLoggedIn: action.isLoggedIn}
        default :
            return state
    }
}

//Action Creators

export const setUserInfoAC = (userProfile: UserProfileType) => {
    return {type: "AUTH/SET-USER-INFO", userInfo: userProfile} as const
}
export const setForgottenEmailAC = (forgottenEmail: string) => {
    return {type: "AUTH/SET-FORGOTTEN-EMAIL", forgottenEmail: forgottenEmail} as const
}
export const setIsPasswordReset = (isPasswordReset: boolean) => {
    return {type: "AUTH/SET-RESET-PASSWORD", isPasswordReset: isPasswordReset} as const
}
export const setLogInAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-LOGGED_IN_OUT', isLoggedIn} as const)

//Thunk Creators

export const loginTC = (data: loginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res) {
            dispatch(setUserInfoAC(res.data))
            dispatch(setLogInAC(true))
        }
    } catch (error: unknown) {
        dispatch(setAppStatusAC('failed'))
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
        dispatch(setLogInAC(false))
    } catch (error: unknown) {
    }
}

export const updateUserInfoTC = (data: UpdateUserNameType) => async (dispatch: Dispatch) => {
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

export const setNewPasswordTC = (data: SetNewPasswordType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.setNewPassword(data)
        dispatch(setIsPasswordReset(false))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}


export const registerTC = (data: registerParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.register(data)
        window.location.href = '/login'
    }catch (error: unknown) {
        if (isAxiosError<MyExpectedResponseType>(error)) {
            if (error.response?.data.error) {
                handleServerNetworkError(error.response?.data.error, dispatch)
            } else {
                handleServerNetworkError(error.message, dispatch)
            }
        }
    }finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}



export default authReducer;