import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export type registerParamsType={
    email: string,
    password: string,
}


export const registerAPI = {
    register(data:registerParamsType) {
        return instance.post('auth/register', data);
    }
}


export const authAPI = {
    authMe() {
        return instance.post('auth/me');
    },
    updateName(name:string) {
        return instance.put('auth/me', {name:name ,avatar: ''});
    },
    login() {
        return instance.post('auth/login', {
            "email": "valeralyzhin@gmail.com" ,
            "password": "qwerty123" ,
            "rememberMe": true
        });
    }
}



