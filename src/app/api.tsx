import axios from 'axios'

export const instance = axios.create({
  //  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

const herokuInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    register(data:registerParamsType) {
        return instance.post('auth/register', data);
    },
    authMe() {
        return instance.post('auth/me');
    },
    updateName(data:UpdateUserNameType) {
        return instance.put('auth/me', data);
    },
    login(data: loginParamsType) {
        return instance.post('/auth/login', data);
    },
    logOut() {
        return instance.delete('auth/me');
    },
    forgotPassword(data:ForgotType) {
        return herokuInstance.post('auth/forgot' ,data);
    },
    setNewPassword(data:SetNewPasswordType) {
        return herokuInstance.post('auth/set-new-password' ,data);
    }
}

export type ForgotType = {
    email:string
    from:string
    message:string
}

export type SetNewPasswordType = {
    password:string
    resetPasswordToken:string |undefined
}

export type UpdateUserNameType = {
    name: string | undefined
    avatar: string
}

export type registerParamsType={
    email: string,
    password: string,
}
export type loginParamsType={
    email: string,
    password: string,
    rememberMe:boolean
}

