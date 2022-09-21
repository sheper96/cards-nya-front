import axios from 'axios'
import {signInType} from "../features/Login/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export type registerParamsType={
    email: string,
    password: string,
}
export type loginParamsType={
    email: string,
    password: string,
    rememberMe:boolean
}


export const registerAPI = {
    register(data:registerParamsType) {
        return instance.post('auth/register', data);
    }
}
export const authAPI={
    login(data: loginParamsType) {
        return instance.post('/auth/login', data);
    }
}
export const logOutAPI={
    logOut(){
        return instance.delete('/auth/me')
    }
}