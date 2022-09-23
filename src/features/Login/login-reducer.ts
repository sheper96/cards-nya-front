import {Dispatch} from "redux";
import {authAPI, loginParamsType} from "../../app/api";
import {handleServerNetworkError} from "../../common/utils/utils";
import {isAxiosError} from "../Registration/registration-reducer";
import {setAppErrorAC, setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";


export type signInType={
    email: string,
    password:string,
    rememberMe: boolean,
    userInfo?:userProfile|null
}
type MyExpectedResponseType = {
    error: string;
};
export type userProfile={
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}
type setUserInfoActionCreator={
    type:'SET-USER-INFO',
    info:userProfile
}
type actionsType=setUserInfoActionCreator
const initialState:signInType={
    email: '',
    password:'',
    rememberMe: false
}
let loginReducer = (state=initialState,action: actionsType)=>{

    switch (action.type){
        case "SET-USER-INFO": return {...state,userInfo:action.info}

        default : return state
    }
}
export const logOutTC=()=>async (dispatch:Dispatch) =>{
    try {
        const res= await authAPI.logOut()
        dispatch(setAppInitializedAC(false))
        console.log(res)
    }
    catch (error: unknown){}
}
export const loginTC = (data: loginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res= await authAPI.login(data)
        if(res){
            console.log(res)
            setUserInfoAC(res.data)
            dispatch(setAppInitializedAC(true))
        }
    }
    catch (error: unknown){
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppInitializedAC(false))
        if (isAxiosError<MyExpectedResponseType>(error)) {
            if(error.response?.data.error){
                handleServerNetworkError(error.response?.data.error,dispatch)

                dispatch(setAppErrorAC('some error'))
            }else{
                handleServerNetworkError(error.message,dispatch)
            }
        }
    }
    finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}
type ActionsType =  any
export const setUserInfoAC=(userProfile:userProfile)=>{
    return { type:'SET-USER-INFO', info:userProfile}
}





export default loginReducer;