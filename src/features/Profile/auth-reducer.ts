import {AnyAction, Dispatch} from "redux";
import {authAPI} from "../../app/api";

const SET_USER_DATA = "SET_USER_DATA";
const CHANGE_USER_NAME = "CHANGE_USER_NAME";


let initialState = {
    _id: null,
    email: null,
    rememberMe: null,
    isAdmin: null,
    name: null,
    verified: null,
    publicCardPacksCount: 0,
    created: null,
    updated: null,
    __v: 0,
    token: null,
    tokenDeathTime: null,
    logedIn : true

}

let authReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case SET_USER_DATA:
            debugger
            return {
                ...state,
                ...action.payload,
            }
        case CHANGE_USER_NAME:
            debugger
            return {
                ...state,
                name: action.name,
            }
        default :
            return state;
    }


}


export const setUserDataAC = (_id: any, email: any, rememberMe: any, isAdmin: any,
                              name: any, verified: any, publicCardPacksCount: any, created: any, updated: any, __v: any,
                              token: any, tokenDeathTime: any) => {

    return {
        type: SET_USER_DATA,

        payload: {
            _id: _id,
            email: email,
            rememberMe: rememberMe,
            isAdmin: isAdmin,
            name: name,
            verified: verified,
            publicCardPacksCount: publicCardPacksCount,
            created: created,
            updated: updated,
            __v: __v,
            token: token,
            tokenDeathTime: tokenDeathTime
        }
    }
}

export const updateNameAC = (name: string) => {
    debugger
    return {
        type: CHANGE_USER_NAME,
        name: name
    }
}

export const authTC = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        return authAPI.authMe().then(response => {
            let {
                _id,
                email,
                rememberMe,
                isAdmin,
                name,
                verified,
                publicCardPacksCount,
                created,
                updated,
                __v,
                token,
                tokenDeathTime
            } = response.data;
            dispatch(setUserDataAC(_id, email, rememberMe, isAdmin, name, verified, publicCardPacksCount, created, updated, __v, token, tokenDeathTime))


        })
    }
}

export const logOutTC = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        return authAPI.logOut().then(response => {
            let {
                _id,
                email,
                rememberMe,
                isAdmin,
                name,
                verified,
                publicCardPacksCount,
                created,
                updated,
                __v,
                token,
                tokenDeathTime
            } = response.data;
            dispatch(setUserDataAC(_id, email, rememberMe, isAdmin, name, verified, publicCardPacksCount, created, updated, __v, token, tokenDeathTime))
            window.location.href = '/login'

        })
    }
}

export const updateNameTC = (name: string) => {
    return (dispatch: Dispatch<AnyAction>) => {
        debugger
        return authAPI.updateName(name).then(response => {

            dispatch(updateNameAC(name))

        })
    }
}

export default authReducer;